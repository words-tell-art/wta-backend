import {ArtRequestModel} from "../models"
import RequestState from "../enums/request-state.enum"
import {artRequestRepo} from "../repositories"

export default class ArtRequestService {

    async processed(id: number, imageUrl: string): Promise<ArtRequestModel> {
        const request = await artRequestRepo.get(id)
        await request.update({
            imageUrl: imageUrl,
            state: RequestState.PROCESSED
        })
        return request
    }
}
