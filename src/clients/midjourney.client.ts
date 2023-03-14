import {MidjourneyPuppet, options} from "@d-lab/discord-puppet"
import discordConfig from "../config/discord.config"

export default class MidjourneyClient {
    puppet: MidjourneyPuppet

    constructor() {
        this.puppet = new MidjourneyPuppet(options(
            discordConfig.DISCORD_USERNAME,
            discordConfig.DISCORD_PASSWORD,
            discordConfig.DISCORD_USER_DATA_DIR
        ))
    }

    async start() {
        await this.puppet.start()
        await this.puppet.clickServer("My AI Art")
        await this.puppet.clickChannel("words-tell-art")
        await this.puppet.sendMessage("[wta-backend] ready")
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async listen() {
        // TODO listen chain events
        // this.puppet.imagine()
    }
}