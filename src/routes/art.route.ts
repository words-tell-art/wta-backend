import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validatePathRequest, validateRequest} from "@d-lab/api-kit"
import {ArtCreateRequest, ArtGetRequest, ArtUpdateBodyRequest, ArtUpdatePathRequest} from "../api/dtos/art"
import ArtController from "../controllers/art.controller"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {Role} from "@d-lab/sso"
import {GenealogyGetRequest} from "../api/dtos/art/genealogy"

const router = Router()
const ctrl = new ArtController()

router.post(Endpoint.ART_Create, authMiddleware(), hasRole(Role.Moderator), validateRequest(ArtCreateRequest), handle.bind(ctrl.create))
router.put(Endpoint.ART_Update, authMiddleware(), hasRole(Role.Moderator), validatePathRequest(ArtUpdatePathRequest), validateRequest(ArtUpdateBodyRequest), handle.bind(ctrl.update))
router.get(Endpoint.ART_Get, validatePathRequest(ArtGetRequest), handle.bind(ctrl.get))
router.get(Endpoint.ART_GENEALOGY_Get, validatePathRequest(GenealogyGetRequest), handle.bind(ctrl.getGenealogy))


export default router