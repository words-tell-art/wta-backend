import {IsNumberString} from "class-validator"

export default class ArtIsProcessingRequest {
    @IsNumberString()
    nftId: string
}