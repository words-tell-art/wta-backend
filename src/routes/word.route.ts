import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validatePathRequest, validateRequest} from "@d-lab/api-kit"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {Role} from "@d-lab/sso"
import {WordCreateRequest, WordGetRequest} from "../api/dtos/word"
import WordController from "../controllers/word.controller"

const router = Router()
const ctrl = new WordController()

router.get(Endpoint.METADATA_WORD_Get, validatePathRequest(WordGetRequest), handle.bind(ctrl.metadata))
router.post(Endpoint.WORD_Create, authMiddleware(), hasRole(Role.Moderator), validateRequest(WordCreateRequest), handle.bind(ctrl.create))

export default router