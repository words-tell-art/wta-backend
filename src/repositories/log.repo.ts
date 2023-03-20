import db from "../db/database"
import {Filter, Page} from "@d-lab/api-kit"
import {Log} from "../interfaces"
import Errors from "../utils/errors/Errors"
import {LogModel} from "../models"
import {throwIfNull} from "@d-lab/common-kit"

export default class LogRepo {
    async findAll(filter: Filter, page: Page): Promise<Log[]> {
        return db.Logs.findAll(page.paginate(filter.get()))
    }
    async findById(id: number): Promise<LogModel | null> {
        return db.Logs.findByPk(id)
    }
    async getById(id: number): Promise<LogModel> {
        const log = await this.findById(id)
        throwIfNull(log, Errors.NOT_FOUND_Log(`NotFound for id[${id}]`))
        return log!
    }
}