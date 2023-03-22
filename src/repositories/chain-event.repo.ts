import db from "../db/database"
import {ChainEventModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Filter} from "@d-lab/api-kit"
import {throwIfNull} from "@d-lab/common-kit"

export default class ChainEventRepo {
    public async getAll(): Promise<ChainEventModel[]> {
        return await db.ChainEvents.findAll()
    }

    async findBy(filter: Filter): Promise<ChainEventModel | null> {
        return db.ChainEvents.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<ChainEventModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_ChainEvent(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<ChainEventModel[]> {
        return db.ChainEvents.findAll(filter.get())
    }
    
    async find(id: number): Promise<ChainEventModel | null> {
        return db.ChainEvents.findByPk(id)
    }
    
    async get(id: number): Promise<ChainEventModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_ChainEvent(`id[${id}`))
        return it!
    }
}
