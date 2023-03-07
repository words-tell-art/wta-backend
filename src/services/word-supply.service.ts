import db from "../db/database"
import {WordSupplyModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Filter, throwIfNull} from "@d-lab/api-kit"

export default class WordSupplyService {
    public async getAll(): Promise<WordSupplyModel[]> {
        return await db.WordSupply.findAll()
    }

    async findBy(filter: Filter): Promise<WordSupplyModel | null> {
        return db.WordSupply.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<WordSupplyModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_WordSupply(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<WordSupplyModel[]> {
        return db.WordSupply.findAll(filter.get())
    }
    
    async find(id: number): Promise<WordSupplyModel | null> {
        return db.WordSupply.findByPk(id)
    }
    
    async get(id: number): Promise<WordSupplyModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_WordSupply(`id[${id}`))
        return it!
    }
    
    async create(word: string, consumed: boolean): Promise<WordSupplyModel> {
       return await db.WordSupply.create({
			word: word,
			consumed: consumed
        })
    }

    async update(id: number, data: Partial<WordSupplyModel>): Promise<WordSupplyModel> {
        const it = await this.get(id)
        return await it.update(data)
    }
}
