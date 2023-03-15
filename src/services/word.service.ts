import db from "../db/database"
import {WordModel} from "../models"
import Errors from "../utils/errors/Errors"
import {eq, Filter, isNotNull, throwIfNull} from "@d-lab/api-kit"

export default class WordService {
    public async getAll(): Promise<WordModel[]> {
        return await db.Words.findAll()
    }

    async findBy(filter: Filter): Promise<WordModel | null> {
        return db.Words.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<WordModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_Word(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<WordModel[]> {
        return db.Words.findAll(filter.get())
    }

    async find(id: number): Promise<WordModel | null> {
        return db.Words.findByPk(id)
    }

    async get(id: number): Promise<WordModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_Word(`id[${id}`))
        return it!
    }

    async create(nftId: number, imageUrl: string | null, metadataUrl: string | null): Promise<WordModel> {
        const exist = await this.findBy(eq({nftId: nftId}))
        if (isNotNull(exist)) {
            return exist!
        }
        return await db.Words.create({
            nftId: nftId,
            imageUrl: imageUrl,
            metadataUrl: metadataUrl
        })
    }
}
