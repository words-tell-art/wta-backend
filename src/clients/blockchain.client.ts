import blockchainConfig from "../config/blockchain.config"
import {ethers} from "ethers"
import {chainEventRepo} from "../repositories"
import {eq, logger} from "@d-lab/api-kit"
import {EventName} from "../enums"
import {chainEventService} from "../services"

export default class BlockchainClient {
    contract: string
    provider: ethers.AlchemyProvider
    art: ethers.Contract

    constructor() {
        const contractAbi = [{ /* your contract ABI */}]
        this.provider = new ethers.AlchemyProvider(blockchainConfig.NETWORK, blockchainConfig.ALCHEMY_API_KEY)
        this.art = new ethers.Contract(blockchainConfig.CONTRACT_ART_ADDRESS, contractAbi, this.provider)
    }

    listen() {
        this.art.on("CraftEvent", (id: number, idBurned: number[], event) => {
            chainEventService.create(event.blockNumber, EventName.CRAFT, {
                id: id,
                idBurned: idBurned
            }).then(_ => {
                logger.debug(`CraftEvent saved: ${id}, ${idBurned}, ${event.blockNumber}`)
            })
        }).then((contractInstance) => {
            logger.success(`[server] CraftEvent Syncer is running [${contractInstance}].`)
        }).catch((error) => {
            logger.error(`[server] CraftEvent Syncer failed: ${error}`)
        })
        this.art.on("MergeEvent", (id: number, idBurned: number, event) => {
            chainEventService.create(event.blockNumber, EventName.MERGE, {
                id: id,
                idBurned: idBurned
            }).then(_ => {
                logger.debug(`MergeEvent saved: ${id}, ${idBurned}, ${event.blockNumber}`)
            })
        }).then((contractInstance) => {
            logger.success(`[server] MergeEvent Syncer is running [${contractInstance}].`)
        }).catch((error) => {
            logger.error(`[server] MergeEvent Syncer failed: ${error}`)
        })
    }

    private async syncCraft() {
        const last = await chainEventRepo.findBy(eq({event: EventName.CRAFT}).orderDesc("blockNumber"))
        const filter = this.art.filters.CraftEvent()
        const events = await this.art.queryFilter(filter, last?.blockNumber || 0, 'latest')

        events.forEach((event) => {
            logger.info(`sync event: ${JSON.stringify(event)}`)
            // TODO add events
            //     chainEventService.create(event.blockNumber, EventName.CRAFT, {
            //         id: event.args.idCraft,
            //         idBurned: event.args.idBurned
            //     })
        })
    }

    private async syncMerge() {
        const last = await chainEventRepo.findBy(eq({event: EventName.MERGE}).orderDesc("blockNumber"))
        const filter = this.art.filters.MergeEvent()
        const events = await this.art.queryFilter(filter, last?.blockNumber || 0, 'latest')

        events.forEach((event) => {
            logger.info(`sync event: ${JSON.stringify(event)}`)
            // TODO add events
            //     chainEventService.create(event.blockNumber, EventName.MERGE, {
            //         id: event.args.idCraft,
            //         idBurned: event.args.idBurned
            //     })
        })
    }

    async sync() {
        await this.syncCraft()
        await this.syncMerge()
    }
}