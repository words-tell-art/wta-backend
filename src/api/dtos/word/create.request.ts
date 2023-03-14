import {IsNumber, IsString} from "class-validator"
import {SkipNull} from "@d-lab/api-kit"

export default class WordCreateRequest {
    @IsNumber()
    nftId: number
    @IsString()
    @SkipNull()
    imageUrl: string | null
    @IsString()
    @SkipNull()
    metadataUrl: string | null
}