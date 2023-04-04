import {IsNumberString} from "class-validator"
import {SkipNull} from "@d-lab/api-kit"

export default class ArtIsProcessingRequest {
    @IsNumberString()
    nftId: string
    @IsNumberString()
    @SkipNull()
    blockNumber?: string
}