import {IsNumber, IsString} from "class-validator"
import {MetadataRequest} from "@d-lab/metadata"

export default class WordCreateRequest {
    @IsNumber()
    nftId: number
    @IsString()
    word: string
    @IsString()
    metadata: MetadataRequest
}