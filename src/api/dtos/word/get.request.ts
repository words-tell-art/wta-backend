import {IsNumberString} from "class-validator"

export default class WordGetRequest {
    @IsNumberString()
    id: string
}