import ArtRequestService from "./art-request.service"
import ChainEventService from "./chain-event.service"
import ArtService from "./art.service"
import WordService from "./word.service"
import LogService from "./log.service"

const logService = new LogService()

const wordService = new WordService()
const artService = new ArtService()
const chainEventService = new ChainEventService()
const artRequestService = new ArtRequestService()

export {
	artRequestService,
	chainEventService,
	artService,
	wordService,
    logService
}