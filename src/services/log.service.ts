import {LogEvent, LogScope} from "../enums"
import db from "../db/database"
import {LogModel} from "../models"
import {nowUTC} from "@d-lab/common-kit"

export default class LogService {
    async create(scope: LogScope, event: LogEvent, by: string, message: string | null = null, code: string | null = null): Promise<LogModel> {
       return await db.Logs.create({
            scope: scope,
            event: event,
            message: message,
            code: code,
            createdBy: by,
            createdAt: nowUTC()
        })
    }
}