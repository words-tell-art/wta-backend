import * as process from "process"

const blockchainConfig = {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY!,
    NETWORK: process.env.NETWORK!,
    CONTRACT_ART_ADDRESS: process.env.CONTRACT_ART_ADDRESS!,
    CRAFT_LAUNCH_DATE: process.env.CRAFT_LAUNCH_DATE!,
    ART_LOADING_URL: process.env.ART_LOADING_URL!,
    OPENSEA_DOMAIN: process.env.OPENSEA_DOMAIN!
}

export default blockchainConfig