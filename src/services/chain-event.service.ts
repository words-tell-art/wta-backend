import db, {sequelize} from "../db/database"
import {ChainEventModel} from "../models"
import EventArguments from "../interfaces/event-arguments.interface"
import {artRepo, chainEventRepo, wordRepo} from "../repositories"
import {eq, include} from "@d-lab/api-kit"
import {isNotNull} from "@d-lab/common-kit"
import {EventName} from "../enums"
import RequestState from "../enums/request-state.enum"
import {craftArt, mergeArt, MergedNFT} from "../utils/nft/merge.rule"

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
                const ids = [args.id, ...burned]
                const words = await wordRepo.findAll(include({nftId: ids}))
                merge = craftArt(words, ids)
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
                inputWords: merge.words.join(" "),
                state: RequestState.CREATED,
                imageUrl: null
            })
            return it
        })
    }
}
