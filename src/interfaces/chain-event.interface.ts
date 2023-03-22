import EventArguments from "./event-arguments.interface"
import {EventName} from "../enums"

export default interface ChainEvent {
	id: number
	blockNumber: number
	event: EventName
	arguments: string
	processed: boolean
	processedByRequest: number | null
	createdAt: Date
	updatedAt: Date
}