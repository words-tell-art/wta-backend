import {IsNumber, IsObject} from "class-validator"
import PartialMetadataRequest from "../metadata/partial-metadata.request"

export default class WordUpdateRequest {
    @IsNumber()
    nftId: number
    @IsObject()
    metadata: PartialMetadataRequest
}