import {EventName} from "../enums"

export default interface ChainEvent {
	id: number
	blockNumber: number
	event: EventName
	arguments: string
	createdAt: Date
	updatedAt: Date
}