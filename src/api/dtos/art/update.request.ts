import {IsNumberString} from "class-validator"
import {PartialMetadataRequest} from "@d-lab/metadata"

export class ArtUpdateBodyRequest {
    metadata: PartialMetadataRequest
}

export class ArtUpdatePathRequest {
    @IsNumberString()
    nftId: string
}