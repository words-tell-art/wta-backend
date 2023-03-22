import ArtRequestRepo from "./art-request.repo"
import ChainEventRepo from "./chain-event.repo"
import ArtRepo from "./art.repo"
import WordRepo from "./word.repo"
import LogRepo from "./log.repo"
import GenealogyRepo from "./genealogy.repo"

const logRepo = new LogRepo()
const wordRepo = new WordRepo()
const artRepo = new ArtRepo()
const genealogyRepo = new GenealogyRepo()
const chainEventRepo = new ChainEventRepo()
const artRequestRepo = new ArtRequestRepo()

export {
	artRequestRepo,
	chainEventRepo,
    artRepo,
    wordRepo,
    logRepo,
	genealogyRepo
}