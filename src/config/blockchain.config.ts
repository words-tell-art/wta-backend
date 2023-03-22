import * as process from "process"

const blockchainConfig = {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY!,
    NETWORK: process.env.NETWORK!,
    CONTRACT_ART_ADDRESS: process.env.CONTRACT_ART_ADDRESS!
}

export default blockchainConfig