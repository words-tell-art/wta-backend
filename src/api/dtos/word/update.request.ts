import {IsNumberString} from "class-validator"
import {PartialMetadataRequest} from "@d-lab/metadata"

export class WordUpdateBodyRequest {
    metadata: PartialMetadataRequest
}

export class WordUpdatePathRequest {
    @IsNumberString()
    nftId: string
}