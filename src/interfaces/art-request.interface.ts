export default interface ArtRequest {
	id: number
	chainEventId: number
	nftId: number
	status: number
	imageUrl: string | null
	createdAt: Date
	updatedAt: Date
}