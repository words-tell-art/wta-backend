export default interface ChainEvent {
	id: number
	blockNumber: number
	event: string
	arguments: string
	processed: boolean
	processedByRequest: number | null
	createdAt: Date
	updatedAt: Date
}