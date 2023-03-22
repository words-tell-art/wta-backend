import RequestState from "../enums/request-state.enum"

export default interface ArtRequest {
	id: number
	chainEventId: number
	nftId: number
	status: RequestState
	imageUrl: string | null
	createdAt: Date
	updatedAt: Date
}