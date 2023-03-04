export default interface Art {
	id: number
	nftId: number
	imageUrl: string | null
	metadataUrl: string | null
	createdAt: Date
	updatedAt: Date
}