import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validatePathRequest, validateQueryRequest, validateRequest} from "@d-lab/api-kit"
import ArtRequestController from "../controllers/art-request.controller"
import {ArtRequestBodyUpdateRequest, ArtRequestListRequest, ArtRequestPathUpdateRequest} from "../api/dtos/art-request"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {Role} from "@d-lab/sso"

const router = Router()
const ctrl = new ArtRequestController()

router.get(Endpoint.ART_REQUEST_List, validateQueryRequest(ArtRequestListRequest), handle.bind(ctrl.list))
router.put(Endpoint.ART_REQUEST_Reset, authMiddleware(), hasRole(Role.Moderator),validatePathRequest(ArtRequestPathUpdateRequest), handle.bind(ctrl.reset))
router.put(Endpoint.ART_REQUEST_Process, authMiddleware(), hasRole(Role.Moderator),validatePathRequest(ArtRequestPathUpdateRequest), validateRequest(ArtRequestBodyUpdateRequest), handle.bind(ctrl.processed))

export default router