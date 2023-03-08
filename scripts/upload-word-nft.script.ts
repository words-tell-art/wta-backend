import {craftWordNFT} from "../src/utils/word.generator"
import nftStorageClient from "../src/clients/nft-storage.client"
import metadataClient from "../src/clients/metadata.client"
import nftConfig from "../src/config/nft.config"
import {Blockchain} from "@d-lab/metadata"
import * as fs from "fs"
import {filesFromPath} from "files-from-path"
import * as path from "path"
import {wordService} from "../src/services"

interface WordSupply {
    word: string
    supply: number
}

interface WordNft {
    id: number
    name: string
    word: string
    position: number
    path: string
}

function buildSupply(): string[] {
    const supply: WordSupply[] = JSON.parse(fs.readFileSync('input/word-supply.json', 'utf8'))
    const words: string[] = []

    supply.forEach(it => {
        for (let i = 0; i < it.supply; i++) {
            words.push(it.word)
        }
    })

    return words
}

function revealWords(startId: number, words: string[], output: string) {
    const maxId: number = startId + words.length

    const nfts: WordNft[] = []
    for (let id = startId + 1; id <= maxId; id++) {
        const pick = Math.floor(Math.random() * words.length)
        const word = words[pick]
        const position = (id - 1) % 5
        const image = craftWordNFT([{text: word, row: position}])
        fs.writeFileSync(`${output}/word_${id}.png`, image)
        nfts.push({
            id: id,
            name: `Word ${id}`,
            path: `word_${id}.png`,
            position: position,
            word: word
        })
    }
    return nfts
}

async function uploadWords(nfts: WordNft[], directory: string) {
    const files = filesFromPath(directory, {
        pathPrefix: path.resolve(directory),
        hidden: true
    })
    const cid = await nftStorageClient.storeDirectory(files)
    console.log(cid)
    const status = await nftStorageClient.status(cid)
    console.log(status)
    const http = cid.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
    for (const nft of nfts) {
        const imageUrl = `${http}/${nft.path}.png`
        await metadataClient.token.updateMetadata(
            {
                chainId: Blockchain.ETHEREUM,
                collectionAddress: nftConfig.collection.WORD_ADDRESS,
                tokenId: nft.id.toString(),
            }, {
                name: nft.name,
                description: nft.name,
                imageUrl: imageUrl,
                externalUrl: "",
                animationUrl: "",
                properties: {
                    w1: nft.position == 0 ? nft.word : "",
                    w2: nft.position == 1 ? nft.word : "",
                    w3: nft.position == 2 ? nft.word : "",
                    w4: nft.position == 3 ? nft.word : "",
                    w5: nft.position == 4 ? nft.word : "",
                }
            })
        const metadataUrl = `${nftConfig.METADATA_URL}/metadata/${Blockchain.ETHEREUM}/${nftConfig.collection.WORD_ADDRESS}/${nft.id.toString()}`
        await wordService.create(nft.id, imageUrl, metadataUrl)
    }
}

async function run() {
    console.log("start")
    const output = "output"
    const words = buildSupply()
    console.log("words", words)
    const nfts = revealWords(0, words, output)
    await uploadWords(nfts, output)
}

run()
    .then()
    .catch(e => console.log)