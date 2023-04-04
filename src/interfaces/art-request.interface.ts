import RequestState from "../enums/request-state.enum"

export default interface ArtRequest {
	id: number
	chainEventId: number
	blockNumber: number
	nftId: number
	inputImage: string | null
	inputWords: string
	inputHues: string | null
	state: RequestState
	imageUrl: string | null
	createdAt: Date
	updatedAt: Date
}