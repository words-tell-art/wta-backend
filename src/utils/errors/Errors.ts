import {ErrorCode} from "../../enums"
import {HttpException} from "@d-lab/api-kit"

const Errors = {
	REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
	REQUIRE_Role: (role: string) => new HttpException(ErrorCode.REQUIRE_Role, `User has not the required[${role}] role.`),
	NOT_FOUND_ArtRequest: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_ArtRequest, `ArtRequest not found for ${reason}`),
	NOT_FOUND_ChainEvent: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_ChainEvent, `ChainEvent not found for ${reason}`),
	NOT_FOUND_Art: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Art, `Art not found for ${reason}`),
	NOT_FOUND_Word: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Word, `Word not found for ${reason}`),
    NOT_FOUND_Log: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Log, `${reason}`),
	INVALID_Word: (reason: string) => new HttpException(ErrorCode.INVALID_Word, `${reason}`),
	INVALID_ART_Craft: (reason: string) => new HttpException(ErrorCode.INVALID_ART_Craft, `${reason}`),
}

export default Errors