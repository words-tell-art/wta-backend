import db from "../db/database"
import {ChainEventModel} from "../models"
import EventArguments from "../interfaces/event-arguments.interface"
import {chainEventRepo} from "../repositories"
import {eq} from "@d-lab/api-kit"
import {isNotNull} from "@d-lab/common-kit"
import {EventName} from "../enums"

export default class ChainEventService {

    async create(blockNumber: number, event: EventName, args: EventArguments): Promise<ChainEventModel> {
        const exist = await chainEventRepo.findBy(eq({blockNumber, event, arguments: JSON.stringify(args)}))
        if (isNotNull(exist)) {
            return exist!
        }
        return await db.ChainEvents.create({
            blockNumber: blockNumber,
            event: event,
            arguments: args,
            processed: false,
            processedByRequest: null
        })
    }
}
