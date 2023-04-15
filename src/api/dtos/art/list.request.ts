import {PageRequest, SkipNull} from "@d-lab/api-kit"
import {IsDateString} from "class-validator"

export default class ArtListRequest extends PageRequest {
    @IsDateString()
    @SkipNull()
    createdAfter: string | null
    @IsDateString()
    @SkipNull()
    createdBefore: string | null
}