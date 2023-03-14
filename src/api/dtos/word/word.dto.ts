export default interface WordDto {
    id: number
    nftId: number
    imageUrl: string | null
    metadataUrl: string | null
    createdAt: Date
    updatedAt: Date
}