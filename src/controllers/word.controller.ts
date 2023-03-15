import {AuthBodyRequest, AuthRequest, PathRequest} from "@d-lab/api-kit"
import {WordCreateRequest, WordDto, WordGetRequest} from "../api/dtos/word"
import {wordService} from "../services"
import {MetadataEthDto, Blockchain, MetadataImxDto} from "@d-lab/metadata"
import metadataClient from "../clients/metadata.client"
import nftConfig from "../config/nft.config"

export default class WordController {
    async create(req: AuthBodyRequest<WordCreateRequest>): Promise<WordDto> {
        const payload = req.body
        return await wordService.create(payload.nftId, payload.imageUrl, payload.metadataUrl)
    }

    async metadata(req: PathRequest<WordGetRequest>): Promise<MetadataEthDto> {
        const tokenId = req.params.id
        const payload = {
            chainId: Blockchain.ETHEREUM,
            collection: nftConfig.collection.WORD_ADDRESS,
            tokenId: tokenId
        }
        const resp: MetadataEthDto | MetadataImxDto = await metadataClient.token.getMetadata(payload)
        return resp as MetadataEthDto
    }
}