import {TokenType} from "../enums"
import {MetadataDto} from "@d-lab/metadata"

export default interface Art {
	id: number
	nftId: number
	metadata: MetadataDto
	parentIds: number[]
	parentType: TokenType
	wordAncestors: number[]
	artAncestors: number[]
	createdAt: Date
	updatedAt: Date
}