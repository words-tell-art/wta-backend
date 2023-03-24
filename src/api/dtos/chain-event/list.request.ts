import {EventName} from "../../../enums"
import {IsDateString, IsEnum, IsNumberString, IsString} from "class-validator"
import {SkipNull} from "@d-lab/api-kit"

export default class ChainEventListRequest {
    @IsNumberString()
    @SkipNull()
    blockNumber: string | null
    @IsEnum(EventName)
    @SkipNull()
    event: EventName | null
    @IsString()
    @SkipNull()
    arguments: string | null
    @IsDateString()
    @SkipNull()
    createdAfter: string | null
    @IsDateString()
    @SkipNull()
    createdBefore: string | null
}