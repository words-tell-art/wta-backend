import {AuthRequest, PathRequest} from "@d-lab/api-kit"
import {GetRequest} from "../api/dtos/word"
import {wordService} from "../services"
import {MetadataEthDto, Blockchain, MetadataImxDto} from "@d-lab/metadata"
import metadataClient from "../clients/metadata.client"
import nftConfig from "../config/nft.config"

export default class WordController {

    async revealAllSupply(req: AuthRequest): Promise<void> {
        await wordService.revealAllSupply()
    }

    async metadata(req: PathRequest<GetRequest>) : Promise<MetadataEthDto> {
        const tokenId = req.params.id
        const payload = {
            chainId: Blockchain.ETHEREUM,
            collectionAddress: nftConfig.collection.WORD_ADDRESS,
            tokenId: tokenId
        }
        const resp: MetadataEthDto | MetadataImxDto = await metadataClient.token.getMetadata(payload)
        return resp as MetadataEthDto
    }
}