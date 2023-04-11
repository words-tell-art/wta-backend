import WordDto from "./word.dto"
import {PageResponse} from "@d-lab/api-kit"

export default interface WordListResponse extends PageResponse {
    words: WordDto[]
}