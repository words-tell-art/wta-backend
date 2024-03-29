import {AuthBodyPathRequest, AuthPathRequest, Filter, QueryRequest} from "@d-lab/api-kit"
import {artRequestRepo} from "../repositories"
import {
    ArtRequestBodyUpdateRequest,
    ArtRequestDto,
    ArtRequestListRequest,
    ArtRequestListResponse,
    ArtRequestPathUpdateRequest
} from "../api/dtos/art-request"
import {toInt, toOptDate} from "@d-lab/common-kit"
import {artRequestService} from "../services"

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

    async reset(req: AuthPathRequest<ArtRequestPathUpdateRequest>): Promise<ArtRequestDto> {
        const id = parseInt(req.params.id)
        return await artRequestService.reset(id)
    }

    async processed(req: AuthBodyPathRequest<ArtRequestBodyUpdateRequest, ArtRequestPathUpdateRequest>): Promise<ArtRequestDto> {
        const payload = req.body
        const id = parseInt(req.params.id)
        return await artRequestService.processed(id, payload.imageUrl)
    }
}