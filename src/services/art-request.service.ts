import {ArtRequestModel} from "../models"
import RequestState from "../enums/request-state.enum"
import {artRequestRepo} from "../repositories"
import metadataClient from "../clients/metadata.client"
import {Blockchain} from "@d-lab/metadata"
import blockchainConfig from "../config/blockchain.config"
import {sequelize} from "../db/database"
import Opensea from "../clients/opensea.client"

export default class ArtRequestService {

    async reset(id: number): Promise<ArtRequestModel> {
        const request = await artRequestRepo.get(id)

        return await sequelize.transaction(async (t) => {
            await request.update({
                imageUrl: null,
                state: RequestState.CREATED
            }, {transaction: t})
            await metadataClient.token.updateMetadata(
                {chainId: Blockchain.ETHEREUM, collection: blockchainConfig.CONTRACT_ART_ADDRESS, tokenId: request.nftId.toString()},
                {
                    imageUrl: blockchainConfig.ART_LOADING_URL,
                    animationUrl: ""
                }
            )
            await Opensea.syncMetadata(blockchainConfig.CONTRACT_ART_ADDRESS, request.nftId)
            return request
        })
    }

    async processed(id: number, imageUrl: string): Promise<ArtRequestModel> {
        const request = await artRequestRepo.get(id)

        return await sequelize.transaction(async (t) => {
            await request.update({
                imageUrl: imageUrl,
                state: RequestState.PROCESSED
            }, {transaction: t})
            await metadataClient.token.updateMetadata(
                {chainId: Blockchain.ETHEREUM, collection: blockchainConfig.CONTRACT_ART_ADDRESS, tokenId: request.nftId.toString()},
                {
                    imageUrl: imageUrl,
                    animationUrl: ""
                }
            )
            await Opensea.syncMetadata(blockchainConfig.CONTRACT_ART_ADDRESS, request.nftId)
            return request
        })
    }
}
