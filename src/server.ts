import 'dotenv/config'
import {connectionParams, sequelize} from "./db/database"
import {logger} from "@d-lab/api-kit"
import app from "./app"
import MidjourneyClient from "./clients/midjourney.client"

const PORT = process.env.PORT || 4000
const midjourneyClient = new MidjourneyClient()

app.listen(PORT, () => {
    logger.success(`[server] API is running on port ${PORT}`)
})

async function setupDatabase() {
    await sequelize.authenticate({
        retry: {
            max: 5,
        },
    })
}

async function startPuppet() {
   // await midjourneyClient.start()
}

setupDatabase()
    .then(() => {
        logger.success(`[server] Database is running on ${connectionParams.host}:${connectionParams.port}`)
    })
    .catch(logger.error)

startPuppet()
    .then(() => {
        logger.success(`[server] MidJourney Puppet is running.`)
    }).catch(logger.error)