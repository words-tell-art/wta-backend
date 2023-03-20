import {MetadataDto} from "@d-lab/metadata"

export default interface Word {
	id: number
	nftId: number
	word: string
	metadata: MetadataDto
	createdAt: Date
	updatedAt: Date
}