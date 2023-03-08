import ArtService from "./art.service"
import WordService from "./word.service"
import LogService from "./log.service"

const logService = new LogService()

const wordService = new WordService()
const artService = new ArtService()

export {
	artService,
	wordService,
    logService
}