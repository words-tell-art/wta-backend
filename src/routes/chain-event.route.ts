import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validateQueryRequest} from "@d-lab/api-kit"
import {ChainEventListRequest} from "../api/dtos/chain-event"
import ChainEventController from "../controllers/chain-event.controller"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {Role} from "@d-lab/sso"

const router = Router()
const ctrl = new ChainEventController()

router.get(Endpoint.CHAIN_EVENT_List, validateQueryRequest(ChainEventListRequest), handle.bind(ctrl.list))
router.post(Endpoint.CHAIN_EVENT_SyncArtRequest, authMiddleware(), hasRole(Role.Moderator), handle.bind(ctrl.syncArtRequests))
export default router