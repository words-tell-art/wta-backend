import blockchainConfig from "../config/blockchain.config"
import {BigNumber, ethers} from "ethers"
import {chainEventRepo} from "../repositories"
import {eq, logger} from "@d-lab/api-kit"
import {EventName} from "../enums"
import {chainEventService} from "../services"
import ArtABI from "../resources/contracts/art-abi"

export default class BlockchainClient {
    provider: ethers.providers.AlchemyProvider
    art: ethers.Contract

    constructor() {
        this.provider = new ethers.providers.AlchemyProvider(blockchainConfig.NETWORK, blockchainConfig.ALCHEMY_API_KEY)
        this.art = new ethers.Contract(blockchainConfig.CONTRACT_ART_ADDRESS, ArtABI.abi, this.provider)
    }

    listen() {
        this.art.on(EventName.CRAFT, (id: BigNumber, idBurned: BigNumber[], event) => {
            chainEventService.create(event.blockNumber, EventName.CRAFT, {
                id: id.toNumber(),
                idBurned: idBurned.map(it => it.toNumber())
            }).then(_ => {
                logger.debug(`CraftEvent saved: ${id}, ${idBurned}, ${event.blockNumber}`)
            })
        })
        this.art.on(EventName.MERGE, (id: BigNumber, idBurned: BigNumber, event) => {
            chainEventService.create(event.blockNumber, EventName.MERGE, {
                id: id.toNumber(),
                idBurned: idBurned.toNumber()
            }).then(_ => {
                logger.debug(`MergeEvent saved: ${id}, ${idBurned}, ${event.blockNumber}`)
            })
        })
    }

    private async syncCraft() {
        const last = await chainEventRepo.findBy(eq({event: EventName.CRAFT}).orderDesc("blockNumber"))
        const filter = this.art.filters.CraftEvent()
        const events = await this.art.queryFilter(filter, last?.blockNumber || 0, 'latest')

        events.forEach((event) => {
            chainEventService.create(event.blockNumber, EventName.CRAFT, {
                id: ((event["args"]![0]) as BigNumber).toNumber(),
                idBurned: event["args"]![1].map((it: BigNumber) => it.toNumber())
            })
        })
    }

    private async syncMerge() {
        const last = await chainEventRepo.findBy(eq({event: EventName.MERGE}).orderDesc("blockNumber"))
        const filter = this.art.filters.MergeEvent()
        const events = await this.art.queryFilter(filter, last?.blockNumber || 0, 'latest')
        events.forEach((event) => {
            chainEventService.create(event.blockNumber, EventName.CRAFT, {
                id: ((event["args"]![0]) as BigNumber).toNumber(),
                idBurned: ((event["args"]![1]) as BigNumber).toNumber()
            })
        })
    }

    async sync() {
        await this.syncCraft()
        await this.syncMerge()
    }

    stop() {
        this.art.removeAllListeners()
    }
}