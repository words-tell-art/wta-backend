import db from "../db/database"
import {WordModel} from "../models"
import {eq} from "@d-lab/api-kit"
import {wordRepo} from "../repositories"
import {isNotNull, merge} from "@d-lab/common-kit"
import {MetadataDto, PartialMetadataRequest} from "@d-lab/metadata"

export default class WordService {

    async create(nftId: number, word: string, metadata: MetadataDto): Promise<WordModel> {
        const exist = await wordRepo.findBy(eq({nftId: nftId}))
        if (isNotNull(exist)) {
            return exist!
        }
        return await db.Words.create({
            nftId: nftId,
            word: word,
            metadata: metadata
        })
    }

    async update(nftId: number, metadata: PartialMetadataRequest): Promise<WordModel> {
        const word = await wordRepo.getBy(eq({nftId: nftId}).orderDesc("id"))
        await word.update({
            metadata: merge(word.metadata, metadata)
        })
        return word
    }
}
