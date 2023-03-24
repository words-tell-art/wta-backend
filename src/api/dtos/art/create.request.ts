import {IsEnum, IsNumber, IsObject} from "class-validator"
import {TokenType} from "../../../enums"
import MetadataRequest from "../metadata/metadata.request"

export default class ArtCreateRequest {
    @IsNumber()
    nftId: number
    @IsObject()
    metadata: MetadataRequest
    @IsNumber(undefined, {each: true})
    parentIds: number[]
    @IsEnum(TokenType)
    parentType: TokenType
}