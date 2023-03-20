import ArtRepo from "./art.repo"
import WordRepo from "./word.repo"
import LogRepo from "./log.repo"
import GenealogyRepo from "./genealogy.repo"

const logRepo = new LogRepo()
const wordRepo = new WordRepo()
const artRepo = new ArtRepo()
const genealogyRepo = new GenealogyRepo()

export {
    artRepo,
    wordRepo,
    logRepo,
	genealogyRepo
}