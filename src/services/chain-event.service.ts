import db from "../db/database"
import {ChainEventModel} from "../models"

export default class ChainEventService {
    
    async create(blockNumber: number, event: string, arguments: string, processed: boolean, processedByRequest: number | null): Promise<ChainEventModel> {
       return await db.ChainEvents.create({
			blockNumber: blockNumber,
			event: event,
			arguments: arguments,
			processed: processed,
			processedByRequest: processedByRequest
        })
    }
}
