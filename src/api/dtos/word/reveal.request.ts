import {IsNumberString} from "class-validator"

export default class RevealRequest {
    @IsNumberString()
    id: string
}