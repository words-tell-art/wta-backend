import {Dialect, Sequelize} from "sequelize"
import config from "../config/db.config"

import {init as initLogModel} from "../models/log.model"
import {init as initWordModel} from "../models/word.model"
import {init as initArtModel} from "../models/art.model"
import {init as initWordSupplyModel} from "../models/word-supply.model"

export const connectionParams = {
    username: config.username,
    password: config.password,
    dialect: "mysql" as Dialect,
    database: config.database,
    host: config.host,
    port: config.port,
    pool: {
        min: 0,
        max: 5,
    },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
        freezeTableName: true,
    },
    timezone: "+08:00",
    logQueryParameters: process.env.NODE_ENV === "development",
    benchmark: true,
}

const sequelize = new Sequelize(connectionParams)

export {sequelize}

const db = {
	WordSupply: initWordSupplyModel(sequelize),
	Arts: initArtModel(sequelize),
	Words: initWordModel(sequelize),
    Logs: initLogModel(sequelize)
}

export default db
