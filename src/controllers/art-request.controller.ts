import {Filter, QueryRequest} from "@d-lab/api-kit"
import {artRequestRepo} from "../repositories"
import {ArtRequestListRequest, ArtRequestListResponse} from "../api/dtos/art-request"
import {toInt, toOptDate} from "@d-lab/common-kit"

export default class ArtRequestController {
    async list(req: QueryRequest<ArtRequestListRequest>): Promise<ArtRequestListResponse> {
        const payload = req.query
        const filter = new Filter()
            .gt({blockNumber: toInt(payload.blockNumber)})
            .equals({nftId: toInt(payload.nftId), state: payload.state})
            .gt({createdAt: toOptDate(payload.createdAfter)})
            .lt({createdAt: toOptDate(payload.createdBefore)})

        const requests = await artRequestRepo.findAll(filter)
        return {
            requests: requests
        }
    }
}