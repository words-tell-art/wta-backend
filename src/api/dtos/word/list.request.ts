import {IsString} from "class-validator"
import {PageRequest, SkipNull} from "@d-lab/api-kit"

export default class WordListRequest extends PageRequest {
    @IsString()
    @SkipNull()
    word: string | null
}