import {IsDateString, IsEnum, IsString} from "class-validator"
import {SkipNull} from "@d-lab/api-kit"
import RequestState from "../../../enums/request-state.enum"

export default class ArtRequestListRequest {
    @IsString()
    @SkipNull()
    blockNumber: string | null
    @IsString()
    @SkipNull()
    nftId: string  | null
    @IsEnum(RequestState)
    @SkipNull()
    state: RequestState | null
    @IsDateString()
    @SkipNull()
    createdAfter: string | null
    @IsDateString()
    @SkipNull()
    createdBefore: string | null
}