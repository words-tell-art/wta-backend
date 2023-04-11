import {Router} from "express"
import {Endpoint} from "../enums"
import {handle, validatePathRequest, validateQueryRequest, validateRequest} from "@d-lab/api-kit"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {Role} from "@d-lab/sso"
import {WordCreateRequest, WordGetRequest, WordListRequest, WordUpdateRequest} from "../api/dtos/word"
import WordController from "../controllers/word.controller"

const router = Router()
const ctrl = new WordController()

router.get(Endpoint.WORD_Get, validatePathRequest(WordGetRequest), handle.bind(ctrl.get))
router.get(Endpoint.WORD_List, validateQueryRequest(WordListRequest), handle.bind(ctrl.list))
router.post(Endpoint.WORD_Create, authMiddleware(), hasRole(Role.Moderator), validateRequest(WordCreateRequest), handle.bind(ctrl.create))
router.put(Endpoint.WORD_Update, authMiddleware(), hasRole(Role.Moderator), validateRequest(WordUpdateRequest), handle.bind(ctrl.update))

export default router