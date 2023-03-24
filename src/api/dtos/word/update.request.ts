import {IsNumberString, IsObject} from "class-validator"
import {PartialMetadataRequest} from "@d-lab/metadata"

export default class WordUpdateRequest {
    @IsNumberString()
    nftId: string
    @IsObject()
    metadata: PartialMetadataRequest
}