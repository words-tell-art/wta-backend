import db from "../db/database"
import {ArtModel} from "../models"
import Errors from "../utils/errors/Errors"
import {eq, Filter, include} from "@d-lab/api-kit"
import {throwIfNull} from "@d-lab/common-kit"
import {GenealogyDto} from "../api/dtos/art/genealogy"
import {TokenType} from "../enums"

export default class ArtRepo {
    public async getAll(): Promise<ArtModel[]> {
        return await db.Arts.findAll()
    }

    async findBy(filter: Filter): Promise<ArtModel | null> {
        return db.Arts.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<ArtModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_Art(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<ArtModel[]> {
        return db.Arts.findAll(filter.get())
    }

    async find(id: number): Promise<ArtModel | null> {
        return db.Arts.findByPk(id)
    }

    async get(id: number): Promise<ArtModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_Art(`id[${id}`))
        return it!
    }
}
