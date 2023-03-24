import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validateQueryRequest} from "@d-lab/api-kit"
import ArtRequestController from "../controllers/art-request.controller"
import {ArtRequestListRequest} from "../api/dtos/art-request"

const router = Router()
const ctrl = new ArtRequestController()

router.get(Endpoint.ART_REQUEST_List, validateQueryRequest(ArtRequestListRequest), handle.bind(ctrl.list))

export default router