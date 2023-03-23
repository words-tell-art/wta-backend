import {MidjourneyPuppet, options, EnlargeType} from "@d-lab/discord-puppet"
import discordConfig from "../config/discord.config"
import {artRequestRepo} from "../repositories"
import {eq} from "@d-lab/api-kit"
import {artRequestService} from "../services"
import RequestState from "../enums/request-state.enum"
import {isNotNull} from "@d-lab/common-kit"

export default class MidjourneyClient {
    puppet: MidjourneyPuppet

    constructor() {
        this.puppet = new MidjourneyPuppet(options(
            discordConfig.DISCORD_USERNAME,
            discordConfig.DISCORD_PASSWORD,
            discordConfig.APP_PUPPET_ARGS,
            discordConfig.DISCORD_USER_DATA_DIR,
            true,
            discordConfig.APP_PUPPET_HEADLESS
        ))
    }

    async start() {
        await this.puppet.start()
        await this.puppet.clickServer("My AI Art")
        await this.puppet.clickChannel("words-tell-art")
        await this.puppet.sendMessage("[wta-backend] ready")
    }

    private async executeRequests() {
        const requests = await artRequestRepo.findAll(eq({state: RequestState.CREATED}).orderAsc("blockNumber").orderAsc("id"))

        for (const request of requests) {
            const cmd = this.getCommand(request.inputImage, request.inputWords)
            const result = await this.puppet.imagineLarge(cmd, EnlargeType.U1)
            if (isNotNull(result.imageUrl)) {
                await artRequestService.processed(request.id, result.imageUrl!)
            }
        }
    }

    private getCommand(image: string | null, words: string): string {
        return `${image + " " || "" }cyberpunk, ${words}, film noir, colourful, minimal environment`
    }

    async listen() {
        // TODO infinite loop every 1min
        // await this.executeRequests()
    }
}