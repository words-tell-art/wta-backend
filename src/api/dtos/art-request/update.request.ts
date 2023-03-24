import {IsNumberString, IsString} from "class-validator"

export class ArtRequestBodyUpdateRequest {
    @IsString()
    imageUrl: string
}

export class ArtRequestPathUpdateRequest {
    @IsNumberString()
    id: string
}