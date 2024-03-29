import db, {sequelize} from "../db/database"
import {ChainEventModel} from "../models"
import EventArguments from "../interfaces/event-arguments.interface"
import {artRepo, chainEventRepo, wordRepo} from "../repositories"
import {eq, extractError, include, logger} from "@d-lab/api-kit"
import {isEmpty, isNotEmpty, isNotNull, isNull, numberOfDays, throwIf} from "@d-lab/common-kit"
import {ColorStyle, EventName, LogEvent, LogScope} from "../enums"
import RequestState from "../enums/request-state.enum"
import {craftArt, mergeArt, MergedNFT, MetadataProps} from "../utils/nft/merge.rule"
import metadataClient from "../clients/metadata.client"
import {Blockchain} from "@d-lab/metadata"
import blockchainConfig from "../config/blockchain.config"
import Opensea from "../clients/opensea.client"
import {QueryTypes} from "sequelize"
import {logService} from "./index"
import Errors from "../utils/errors/Errors"

export default class ChainEventService {

    async create(blockNumber: number, event: EventName, args: EventArguments): Promise<ChainEventModel> {
        const argString = JSON.stringify(args)
        const exist = await chainEventRepo.findBy(eq({blockNumber, event, arguments: argString}))
        if (isNotNull(exist)) {
            return exist!
        }
        const it = await db.ChainEvents.create({
            blockNumber: blockNumber,
            event: event,
            arguments: argString
        })
        try {
            const nftProps = await this.generateArtRequest(it.id, blockNumber, event, args)
            await this.updateArtMetadata(args.id, nftProps)
        } catch (e) {
            const error = extractError(e)
            logger.error(error)
            await logService.create(LogScope.ART_REQUEST, LogEvent.CREATE, "", error)
        }
        return it
    }

    async syncArtRequests(): Promise<ChainEventModel[]> {
        const pending = await sequelize.query(
            "SELECT chev.* FROM chain_events chev LEFT JOIN art_requests art ON art.chain_event_id = chev.id WHERE art.chain_event_id IS NULL"
            , {
                type: QueryTypes.SELECT,
                model: ChainEventModel,
                mapToModel: true
            })
        for (const it of pending) {
            const args: EventArguments = JSON.parse(it.arguments)
            const nftProps = await this.generateArtRequest(it.id, it.blockNumber, it.event, args)
            await this.updateArtMetadata(args.id, nftProps)
        }
        return pending
    }

    private async generateArtRequest(chainEventId: number, blockNumber: number, event: EventName, args: EventArguments): Promise<MetadataProps> {
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
        const finalProps = {...merge.properties}
        const wordsLength = merge.words.filter(isNotEmpty).length
        finalProps.complexity =wordsLength
        finalProps.style = wordsLength > 3 ? ColorStyle.POLYCHROMATIC : ColorStyle.MONOCHROME

        await db.ArtRequests.create({
            chainEventId: chainEventId,
            blockNumber: blockNumber,
            nftId: args.id,
            inputImage: merge.image,
            inputWords: merge.words.join(","),
            inputHues: finalProps.style === ColorStyle.MONOCHROME ? null : merge.hues.join(","),
            state: RequestState.CREATED,
            imageUrl: null
        })
        return finalProps
    }

    private async updateArtMetadata(nftId: number, finalProps: MetadataProps) {
        await metadataClient.token.updateMetadata(
            {chainId: Blockchain.ETHEREUM, collection: blockchainConfig.CONTRACT_ART_ADDRESS, tokenId: nftId.toString()},
            {
                imageUrl: "",
                animationUrl: blockchainConfig.ART_LOADING_URL,
                properties: finalProps,
                description: undefined,
                externalUrl: undefined,
                name: `Words Tell Art #${nftId}`
            }
        )
        await Opensea.syncMetadata(blockchainConfig.CONTRACT_ART_ADDRESS, nftId)
    }
}
