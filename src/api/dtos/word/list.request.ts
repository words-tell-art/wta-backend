import {IsString} from "class-validator"

export default class WordListRequest {
    @IsString()
    word: string
}