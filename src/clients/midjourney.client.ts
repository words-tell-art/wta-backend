import {MidjourneyPuppet, options, EnlargeType} from "@d-lab/discord-puppet"
import discordConfig from "../config/discord.config"
import {artRequestRepo} from "../repositories"
import {eq, logger} from "@d-lab/api-kit"
import {artRequestService} from "../services"
import RequestState from "../enums/request-state.enum"
import {isNotNull} from "@d-lab/common-kit"

export default class MidjourneyClient {
    interval?: NodeJS.Timer
    processing: boolean
    puppet: MidjourneyPuppet

    constructor() {
        this.processing = false
        this.interval = undefined
        this.puppet = new MidjourneyPuppet(options(
            discordConfig.DISCORD_USERNAME,
            discordConfig.DISCORD_PASSWORD,
            discordConfig.APP_PUPPET_ARGS,
            discordConfig.DISCORD_USER_DATA_DIR,
            true,
            discordConfig.APP_PUPPET_HEADLESS
        ))
        this.processRequests = this.processRequests.bind(this);
    }

    async start() {
        await this.puppet.start()
        await this.puppet.clickServer("My AI Art")
        await this.puppet.clickChannel("words-tell-art")
        await this.puppet.sendMessage("[wta-backend] ready")
    }

    private async processRequests() {
        if (this.processing) {
            logger.debug('[Midjourney] Skipping execution - previous run still in progress')
            return
        }
        this.processing = true
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
        this.interval = setInterval(this.processRequests, 60000)
    }

    async stop() {
        clearInterval(this.interval)
        await this.puppet.shutdown()
    }
}