import {EventName} from "../../../enums"

export default interface ChainEventDto {
    id: number
    blockNumber: number
    event: EventName
    arguments: string
    createdAt: Date
    updatedAt: Date
}