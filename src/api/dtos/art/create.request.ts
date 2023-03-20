import {IsEnum, IsNumber, IsObject, IsString} from "class-validator"
import {TokenType} from "../../../enums"
import {MetadataRequest} from "@d-lab/metadata"

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