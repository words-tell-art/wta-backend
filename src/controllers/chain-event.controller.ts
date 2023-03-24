import {Filter, QueryRequest} from "@d-lab/api-kit"
import {chainEventRepo} from "../repositories"
import {toInt, toOptDate} from "@d-lab/common-kit"
import {ChainEventListRequest, ChainEventListResponse} from "../api/dtos/chain-event"

export default class ChainEventController {
    async list(req: QueryRequest<ChainEventListRequest>): Promise<ChainEventListResponse> {
        const payload = req.query
        const filter = new Filter()
            .gt({blockNumber: toInt(payload.blockNumber)})
            .equals({event: payload.event, arguments: payload.arguments})
            .gt({createdAt: toOptDate(payload.createdAfter)})
            .lt({createdAt: toOptDate(payload.createdBefore)})

        const events = await chainEventRepo.findAll(filter)
        return {
            events: events
        }
    }
}