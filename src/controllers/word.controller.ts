import {AuthBodyRequest, Filter, PathRequest, QueryRequest} from "@d-lab/api-kit"
import {WordCreateRequest, WordDto, WordGetRequest, WordListRequest, WordUpdateRequest} from "../api/dtos/word"
import {wordService} from "../services"
import {wordRepo} from "../repositories"
import WordListResponse from "../api/dtos/word/list.response"

export default class WordController {
    async create(req: AuthBodyRequest<WordCreateRequest>): Promise<WordDto> {
        const payload = req.body
        return await wordService.create(payload.nftId, payload.word, payload.metadata)
    }

    async update(req: AuthBodyRequest<WordUpdateRequest>): Promise<WordDto> {
        const payload = req.body
        return await wordService.update(payload.nftId, payload.metadata)
    }

    async get(req: PathRequest<WordGetRequest>): Promise<WordDto> {
        const payload = req.params
        return await wordRepo.get(parseInt(payload.id))
    }

    async list(req: QueryRequest<WordListRequest>): Promise<WordListResponse> {
        const payload = req.query
        const filter = new Filter()
        filter.equals({word: payload.word})
        const words = await wordRepo.findAll(filter)
        return {
            words: words
        }
    }
}