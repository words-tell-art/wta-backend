import RequestState from "../../../enums/request-state.enum"

export default interface ArtRequestDto {
    id: number
    chainEventId: number
    blockNumber: number
    nftId: number
    inputImage: string | null
    inputWords: string
    state: RequestState
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
}