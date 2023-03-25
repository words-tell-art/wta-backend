import db, {sequelize} from "../db/database"
import {ChainEventModel} from "../models"
import EventArguments from "../interfaces/event-arguments.interface"
import {artRepo, chainEventRepo, wordRepo} from "../repositories"
import {eq, include} from "@d-lab/api-kit"
import {isNotNull, isNull, numberOfDays} from "@d-lab/common-kit"
import {EventName} from "../enums"
import RequestState from "../enums/request-state.enum"
import {craftArt, mergeArt, MergedNFT} from "../utils/nft/merge.rule"
import metadataClient from "../clients/metadata.client"
import {Blockchain} from "@d-lab/metadata"
import blockchainConfig from "../config/blockchain.config"
import Opensea from "../clients/opensea.client"

export default class ChainEventService {

    async create(blockNumber: number, event: EventName, args: EventArguments): Promise<ChainEventModel> {
        const argString = JSON.stringify(args)
        const exist = await chainEventRepo.findBy(eq({blockNumber, event, arguments: argString}))
        if (isNotNull(exist)) {
            return exist!
        }
        return await sequelize.transaction(async (t) => {
            let merge: MergedNFT
            if (event === EventName.CRAFT) {
                const burned: number[] = args.idBurned as []
                const words = await wordRepo.findAll(include({nftId: burned}))
                merge = craftArt(words, burned)
            } else {
                const burned: number = args.idBurned as number
                const ids = [args.id, burned]
                const arts = await artRepo.findAll(include({nftId: ids}))
                merge = mergeArt(arts, ids)
            }
            const it = await db.ChainEvents.create({
                blockNumber: blockNumber,
                event: event,
                arguments: argString
            }, {transaction: t})
            await db.ArtRequests.create({
                chainEventId: it.id,
                blockNumber: blockNumber,
                nftId: args.id,
                inputImage: merge.image,
                inputWords: merge.words.join(","),
                state: RequestState.CREATED,
                imageUrl: null
            }, {transaction: t})
            const finalProps = {...merge.properties}
            finalProps.date = numberOfDays(new Date(blockchainConfig.CRAFT_LAUNCH_DATE), new Date())
            finalProps.complexity = merge.words.length
            finalProps.style = merge.words.length > 3 ? "Polychromatic" : "Monochrome"
            finalProps.generation = isNull(finalProps.generation) ? 0 : parseInt(finalProps.generation!.toString()) + 1
            await metadataClient.token.updateMetadata(
                {chainId: Blockchain.ETHEREUM, collection: blockchainConfig.CONTRACT_ART_ADDRESS, tokenId: args.id.toString()},
                {imageUrl: "", animationUrl: blockchainConfig.ART_LOADING_URL, properties: finalProps, description: undefined, externalUrl: undefined, name: undefined}
            )
            await Opensea.syncMetadata(blockchainConfig.CONTRACT_ART_ADDRESS, args.id)
            return it
        })
    }
}
