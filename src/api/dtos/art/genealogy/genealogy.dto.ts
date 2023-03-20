import {TokenType} from "../../../../enums"
import {MetadataDto} from "@d-lab/metadata"

export default interface GenealogyDto {
    id: number
    nftId: number
    type: TokenType
    metadata: MetadataDto
    parents: GenealogyDto[]
    createdAt: Date
    updatedAt: Date
}