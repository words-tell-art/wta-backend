import {EnlargeType, MidjourneyPuppet, options} from "@d-lab/discord-puppet"
import discordConfig from "../config/discord.config"
import {artRequestRepo} from "../repositories"
import {eq, logger} from "@d-lab/api-kit"
import {artRequestService} from "../services"
import RequestState from "../enums/request-state.enum"
import {isNotNull, replaceAll} from "@d-lab/common-kit"
import * as console from "console"

export default class MidjourneyClient {
    running = false
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
        this.running = true
    }

    private async processRequests() {
        if (this.processing) {
            logger.debug('[Midjourney] Skipping execution - previous run still in progress')
            return
        }
        this.processing = true
        const requests = await artRequestRepo.findAll(eq({state: RequestState.CREATED}).orderAsc("blockNumber").orderAsc("id"))
        console.log(requests)
        for (const request of requests) {
            console.log("[req] ", request.id, request.nftId)
            const cmd = this.getCommand(
                request.inputImage,
                request.inputWords,
                request.inputHues
            )
            const result = await this.puppet.imagineLarge(cmd, EnlargeType.U1)
            console.log("[req]: ", result.imageUrl)
            if (isNotNull(result.imageUrl)) {
                await artRequestService.processed(request.id, result.imageUrl!)
            }
            console.log("[req]: done")
        }
    }

    private cleanInput(input: string): string {
        return replaceAll(input, ",", " ")
            .replace(/\s+/g, " ")
            .trim()
    }

    private getCommand(image: string | null, inputWords: string, inputHues: string | null): string {
        const words = this.cleanInput(inputWords)
        const hues = isNotNull(inputHues) ? this.cleanInput(inputHues!).replace(" ", " and ") : null
        let colors = "monochrome"
        if (isNotNull(hues)) {
            colors = `colorful with ${hues!} dominant color`
        }
        return `${isNotNull(image)? image + " " : ""}${words}::2 style cyberpunk::1.2 film noir, minimal environment, ${colors} --no frame`
    }

    async listen() {
        this.interval = setInterval(this.processRequests, 60000)
    }

    async stop() {
        if (isNotNull(this.interval)) {
            clearInterval(this.interval)
        }
        if (this.running) {
            await this.puppet.shutdown()
        }
        this.running = false
    }
}