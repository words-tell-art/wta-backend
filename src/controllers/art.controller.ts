import {AuthBodyRequest, PathRequest} from "@d-lab/api-kit"
import {artRepo, genealogyRepo} from "../repositories"
import {artService} from "../services"
import {ArtCreateRequest, ArtGetRequest, ArtUpdateRequest} from "../api/dtos/art"
import ArtDto from "../api/dtos/art/art.dto"
import {GenealogyDto, GenealogyGetRequest} from "../api/dtos/art/genealogy"

export default class ArtController {
    async create(req: AuthBodyRequest<ArtCreateRequest>): Promise<ArtDto> {
        const payload = req.body
        return await artService.create(payload.nftId, payload.metadata, payload.parentIds, payload.parentType)
    }

    async update(req: AuthBodyRequest<ArtUpdateRequest>): Promise<ArtDto> {
        const payload = req.body
        return await artService.update(parseInt(payload.nftId), payload.metadata)
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
}