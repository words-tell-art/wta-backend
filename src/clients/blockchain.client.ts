import blockchainConfig from "../config/blockchain.config"
import {ethers} from "ethers"

export default class BlockchainClient {
    contract: string
    provider: ethers.AlchemyProvider
    art: ethers.Contract

    constructor() {
        const contractAbi = [{ /* your contract ABI */}];
        this.provider = new ethers.AlchemyProvider(blockchainConfig.NETWORK, blockchainConfig.ALCHEMY_API_KEY);
        this.art = new ethers.Contract(blockchainConfig.CONTRACT_ART_ADDRESS, contractAbi, this.provider);
    }

    listen() {
        this.art.on("CraftEvent", (idCraft: number, idBurned: number[], event) => {
            console.log("CraftEvent emitted:", idCraft, idBurned, event.blockNumber);
            // TODO: handle the event data
        }).then((contractInstance) => {
            console.log("Event listener registered on contract instance:", contractInstance.address);
        }).catch((error) => {
            console.error("Error registering event listener:", error);
        })
        this.art.on("MergeEvent", (idMerged: number, idBurned: number, event) => {
            console.log("CraftEvent emitted:", idMerged, idBurned, event.blockNumber);
            // TODO: handle the event data
        }).then((contractInstance) => {
            console.log("Event listener registered on contract instance:", contractInstance.address);
        }).catch((error) => {
            console.error("Error registering event listener:", error);
        });
    }

    private async syncCraft() {
        const filter = this.art.filters.CraftEvent();
        const events = await this.art.queryFilter(filter, 0, 'latest')
        // events.forEach((event) => {
        //     console.log("idCraft:", event.idCraft);
        //     console.log("idBurned:", event.args.idBurned);
        //     console.log("address:", event.args._address);
        //     console.log("blockNumber:", event.blockNumber);
        // });
    }

    private async syncMerge() {
        const filter = this.art.filters.MergeEvent();
        const events = await this.art.queryFilter(filter, 0, 'latest')

    }

    async sync() {
        await this.syncCraft()
        await this.syncMerge()
    }
}