import {PathRequest} from "@d-lab/api-kit"
import {ArtGetRequest} from "../api/dtos/art"
import {MetadataEthDto, MetadataImxDto, Blockchain} from "@d-lab/metadata"
import nftConfig from "../config/nft.config"
import metadataClient from "../clients/metadata.client"

export default class ArtController {
    async metadata(req: PathRequest<ArtGetRequest>) : Promise<MetadataEthDto> {
        const tokenId = req.params.id
        const payload = {
            chainId: Blockchain.ETHEREUM,
            collection: nftConfig.collection.ART_ADDRESS,
            tokenId: tokenId
        }
        const resp: MetadataEthDto | MetadataImxDto = await metadataClient.token.getMetadata(payload)
        return resp as MetadataEthDto
    }
}