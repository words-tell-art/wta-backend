import {IsNumberString} from "class-validator"

export default class GenealogyGetRequest {
    @IsNumberString()
    nftId: string
}