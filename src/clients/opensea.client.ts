import {Http} from "@d-lab/common-kit"
import blockchainConfig from "../config/blockchain.config"
import {logger} from "@d-lab/api-kit"

export default class Opensea {
    static async syncMetadata(collectionAddress: string, nftId: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            Http.get(
                blockchainConfig.OPENSEA_DOMAIN,
                "/asset/:collectionAddress/:tokenId",
                null,
                {
                    path: {collectionAddress: collectionAddress, tokenId: nftId.toString()},
                    query: {force_update: "true"}
                }, (data) => {
                    resolve(data)
                }, (error) => {
                    logger.error(`[Opensea] can't update metadata for [${nftId}] due to: ${JSON.stringify(error)}`)
                    resolve(error)
                })
        })
    }
}