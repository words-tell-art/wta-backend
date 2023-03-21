import * as process from "process"

const blockchainConfig = {
    ALCHEMY_API_KEY: process.env.ALCHMY_API_KEY!,
    NETWORK: process.env.NETWORK!,
    CONTRACT_ART_ADDRESS: process.env.ART_CONTRACT_ADDRESS!
}

export default blockchainConfig