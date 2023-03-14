import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validatePathRequest} from "@d-lab/api-kit"
import {ArtGetRequest} from "../api/dtos/art"
import ArtController from "../controllers/art.controller"

const router = Router()
const ctrl = new ArtController()

router.get(Endpoint.METADATA_ART_Get, validatePathRequest(ArtGetRequest), handle.bind(ctrl.metadata))

export default router