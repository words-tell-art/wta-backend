import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validateQueryRequest} from "@d-lab/api-kit"
import {ChainEventListRequest} from "../api/dtos/chain-event"
import ChainEventController from "../controllers/chain-event.controller"

const router = Router()
const ctrl = new ChainEventController()

router.get(Endpoint.CHAIN_EVENT_List, validateQueryRequest(ChainEventListRequest), handle.bind(ctrl.list))

export default router