import {ErrorCode} from "../../enums"
import {HttpException} from "@d-lab/api-kit"

const Errors = {
	NOT_FOUND_WordSupply: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_WordSupply, `WordSupply not found for ${reason}`),
	NOT_FOUND_Art: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Art, `Art not found for ${reason}`),
	NOT_FOUND_Word: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Word, `Word not found for ${reason}`),
    NOT_FOUND_Log: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Log, `${reason}`),
	INVALID_Word: (reason: string) => new HttpException(ErrorCode.INVALID_Word, `${reason}`),
}

export default Errors