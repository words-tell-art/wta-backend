import {IsNumber, IsObject, IsString} from "class-validator"
import MetadataRequest from "../metadata/metadata.request"

export default class WordCreateRequest {
    @IsNumber()
    nftId: number
    @IsString()
    word: string
    @IsObject()
    metadata: MetadataRequest
}