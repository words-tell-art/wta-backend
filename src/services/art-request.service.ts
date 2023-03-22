import db from "../db/database"
import {ArtRequestModel} from "../models"
import RequestState from "../enums/request-state.enum"

export default class ArtRequestService {
    
    async create(chainEventId: number, nftId: number): Promise<ArtRequestModel> {
       return await db.ArtRequests.create({
			chainEventId: chainEventId,
			nftId: nftId,
			status: RequestState.CREATED,
			imageUrl: null
        })
    }
}
