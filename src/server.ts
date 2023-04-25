import 'dotenv/config'
import {sequelize} from "./db/database"
import {logger} from "@d-lab/api-kit"
import app from "./app"
import MidjourneyClient from "./clients/midjourney.client"
import BlockchainClient from "./clients/blockchain.client"
import dbConfig from "./config/db.config"
import {isNotEmpty} from "@d-lab/common-kit"
import blockchainConfig from "./config/blockchain.config"

const PORT = process.env.PORT || 4000
const midjourneyClient = new MidjourneyClient()
const blockchainClient = new BlockchainClient()

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

async function startChainSyncer() {
    if (isNotEmpty(blockchainConfig.CONTRACT_ART_ADDRESS)) {
        blockchainClient.setup()
        blockchainClient.listen()
        await blockchainClient.sync()
        return true
    }
    return false
}

app.listen(PORT, () => {
    logger.success(`[server] API is running on port ${PORT}`)
})


/**
 * Error handler
 */
process.on('SIGINT', () => {
    logger.error('SIGINT signal received.');
    midjourneyClient.stop()
        .then(_ => {
            blockchainClient.stop()
            process.exit(0)
        })
})
process.on('SIGTERM', () => {
    logger.error('SIGTERM signal received.');
    midjourneyClient.stop()
        .then(_ => {
            blockchainClient.stop()
            process.exit(0)
        })
})
process.on('uncaughtException', error => {
    logger.error('Uncaught Exception:', error);
    midjourneyClient.stop()
        .then(_ => {
            blockchainClient.stop()
            process.exit(0)
        })
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

startChainSyncer()
    .then(success => {
        if (success) {
            logger.success(`[server] Chain Syncer is running.`)
        } else {
            logger.error(`[server] Chain Syncer is not running.`)
        }
    }).catch(logger.error)