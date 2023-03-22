import db from "../db/database"
import {ArtRequestModel} from "../models"

export default class ArtRequestService {
    
    async create(chainEventId: number, nftId: number, status: number, imageUrl: string | null): Promise<ArtRequestModel> {
       return await db.ArtRequests.create({
			chainEventId: chainEventId,
			nftId: nftId,
			status: status,
			imageUrl: imageUrl
        })
    }
}
