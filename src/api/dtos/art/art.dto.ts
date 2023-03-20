import {TokenType} from "../../../enums"
import {MetadataDto} from "@d-lab/metadata"

export default interface ArtDto {
    id: number
    nftId: number
    metadata: MetadataDto
    parentIds: number[]
    parentType: TokenType
    createdAt: Date
    updatedAt: Date
}