import {PageResponse} from "@d-lab/api-kit"
import ArtDto from "./art.dto"

export default interface ArtListResponse extends PageResponse {
    arts: ArtDto[]
}