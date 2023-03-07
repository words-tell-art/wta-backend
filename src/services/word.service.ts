import db from "../db/database"
import {WordModel} from "../models"
import Errors from "../utils/errors/Errors"
import {eq, Filter, throwIfNull} from "@d-lab/api-kit"
import {wordSupplyService} from "./index"
import {WordSupply} from "../interfaces"
import {craftWordNFT} from "../utils/word.generator"
import metadataClient from "../clients/metadata.client"
import {Blockchain} from "@d-lab/metadata"
import nftConfig from "../config/nft.config"

export default class WordService {
    public async getAll(): Promise<WordModel[]> {
        return await db.Words.findAll()
    }

    async findBy(filter: Filter): Promise<WordModel | null> {
        return db.Words.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<WordModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_Word(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<WordModel[]> {
        return db.Words.findAll(filter.get())
    }
    
    async find(id: number): Promise<WordModel | null> {
        return db.Words.findByPk(id)
    }
    
    async get(id: number): Promise<WordModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_Word(`id[${id}`))
        return it!
    }
    
    async create(nftId: number, imageUrl: string | null, metadataUrl: string | null): Promise<WordModel> {
       return await db.Words.create({
			nftId: nftId,
			imageUrl: imageUrl,
			metadataUrl: metadataUrl
        })
    }

    async revealAllSupply(): Promise<void> {
        const lastWord: WordModel | null = await db.Words.findOne({
            order: [
                ['id', 'DESC']
            ]
        })
        const lastId = lastWord?.id ?? 1
        const supply: WordSupply[] = await wordSupplyService.findAll(eq({consumed: false}))
        const maxId = lastId + supply.length

        for (let i = lastId + 1; i <= maxId; i++) {
            const pick = Math.floor(Math.random() * supply.length)
            const word = supply[pick]
            const position = Math.floor(Math.random() * 5)
            const image = craftWordNFT([{text: word.word, row: position}])
            // TODO upload image to ipfs
            const uploadedImage = ""
            await metadataClient.token.updateMetadata(
                {
                    chainId: Blockchain.ETHEREUM,
                    collectionAddress: nftConfig.collection.WORD_ADDRESS,
                    tokenId: i.toString(),
                }, {
                    name: `Word ${i}`,
                    description: `Word ${i}`,
                    imageUrl:uploadedImage,
                    externalUrl: "",
                    animationUrl: "",
                    properties: {
                        w1: position == 0 ? word.word : "",
                        w2: position == 1 ? word.word : "",
                        w3: position == 2 ? word.word : "",
                        w4: position == 3 ? word.word : "",
                        w5: position == 4 ? word.word : "",
                    }
                })
            await this.create(i, null, null)
            await wordSupplyService.update(word.id, {consumed: true})
        }
    }
}
