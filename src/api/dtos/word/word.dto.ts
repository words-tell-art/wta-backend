import {MetadataDto} from "@d-lab/metadata"

export default interface WordDto {
    id: number
    nftId: number
    word: string
    metadata: MetadataDto
    createdAt: Date
    updatedAt: Date
}