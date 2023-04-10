import 'dotenv/config'
import {sequelize} from "./db/database"
import {logger} from "@d-lab/api-kit"
import MidjourneyClient from "./clients/midjourney.client"
import dbConfig from "./config/db.config"

const midjourneyClient = new MidjourneyClient()

async function setupDatabase() {
    await sequelize.authenticate({
        retry: {
            max: 5,
        },
    })
}

async function startPuppet() {
    await midjourneyClient.start()
    await midjourneyClient.listen()
}
/**
 * Error handler
 */
process.on('SIGINT', () => {
    logger.error('SIGINT signal received.');
    midjourneyClient.stop()
})
process.on('SIGTERM', () => {
    logger.error('SIGTERM signal received.');
    midjourneyClient.stop()
})
process.on('uncaughtException', error => {
    logger.error('Uncaught Exception:', error);
    midjourneyClient.stop()
})

/**
 * Start server apps
 */
setupDatabase()
    .then(() => {
        logger.success(`[server] Database is running on ${dbConfig.host}:${dbConfig.port}`)
    })
    .catch(logger.error)

startPuppet()
    .then(() => {
        logger.success(`[server] MidJourney Puppet is running.`)
    }).catch(logger.error)