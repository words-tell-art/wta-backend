import {IsNumberString} from "class-validator"

export default class ArtGetRequest {
    @IsNumberString()
    id: string
}