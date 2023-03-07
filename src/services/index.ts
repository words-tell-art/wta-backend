import WordSupplyService from "./word-supply.service"
import ArtService from "./art.service"
import WordService from "./word.service"
import LogService from "./log.service"

const logService = new LogService()
const wordService = new WordService()
const artService = new ArtService()
const wordSupplyService = new WordSupplyService()

export {
	wordSupplyService,
	artService,
	wordService,
    logService
}