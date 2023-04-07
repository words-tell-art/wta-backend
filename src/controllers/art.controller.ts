import {AuthBodyRequest, eq, PathRequest, QueryRequest} from "@d-lab/api-kit"
import {artRepo, artRequestRepo, genealogyRepo} from "../repositories"
import {artService} from "../services"
import {ArtCreateRequest, ArtGetRequest, ArtIsProcessingRequest, ArtIsProcessingResponse, ArtUpdateRequest} from "../api/dtos/art"
import ArtDto from "../api/dtos/art/art.dto"
import {GenealogyDto, GenealogyGetRequest} from "../api/dtos/art/genealogy"
import {isNotNull} from "@d-lab/common-kit"
import RequestState from "../enums/request-state.enum"

export default class ArtController {
    async create(req: AuthBodyRequest<ArtCreateRequest>): Promise<ArtDto> {
        const payload = req.body
        return await artService.create(payload.nftId, payload.metadata, payload.parentIds, payload.parentType)
    }

    async update(req: AuthBodyRequest<ArtUpdateRequest>): Promise<ArtDto> {
        const payload = req.body
        return await artService.update(payload.nftId, payload.metadata)
    }

    async get(req: PathRequest<ArtGetRequest>): Promise<ArtDto> {
        const payload = req.params
        const art = await artRepo.get(parseInt(payload.id))
        return {
            id: art.id,
            nftId: art.nftId,
            metadata: art.metadata,
            parentIds: art.parentIds,
            parentType: art.parentType,
            createdAt: art.createdAt,
            updatedAt: art.updatedAt,
        }
    }

    async getGenealogy(req: PathRequest<GenealogyGetRequest>): Promise<GenealogyDto> {
        const payload = req.params
        return await genealogyRepo.get(parseInt(payload.nftId))
    }

    async isProcessing(req: QueryRequest<ArtIsProcessingRequest>): Promise<ArtIsProcessingResponse> {
        const nftId = parseInt(req.query.nftId)
        let filter = eq({"nftId": nftId})
        if (isNotNull(req.query.blockNumber)) {
            filter = filter.equals({"blockNumber": parseInt(req.query.blockNumber!)})
        } else {
            filter = filter.orderDesc("blockNumber")
        }
        const artRequest = await artRequestRepo.findBy(filter)
        return {
            processing: isNotNull(artRequest) && artRequest!.state === RequestState.CREATED
        }
    }
}