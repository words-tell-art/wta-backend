import {Blockchain, Client as MetadataClient} from "@d-lab/metadata"
import {filesFromPath} from "files-from-path"
import {NFTStorage} from "nft.storage"
import * as path from "path"
import * as fs from "fs"
import {craftWordNFT} from "./utils/word.generator"
import {Auth, Http} from "@d-lab/api-kit"

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

const config = {
    SSO_API_KEY: process.env.SSO_API_KEY!,
    STORAGE_API_KEY: process.env.STORAGE_API_KEY!,
    WORD_ADDRESS: process.env.WORD_ADDRESS!,
    METADATA_URL: process.env.METADATA_URL!,
    WTA_URL: process.env.WTA_URL!
}
const nftStorageClient = new NFTStorage({token: config.STORAGE_API_KEY})
const metadataClient = new MetadataClient(config.METADATA_URL, config.SSO_API_KEY)

const createWord = async (nftId: number, imageUrl: string, metadataUrl: string) => {
    return new Promise((resolve, reject) => {
        Http.post(
            config.WTA_URL,
            "/api/words",
            Auth.apiKey(config.SSO_API_KEY),
            {body: {nftId, imageUrl, metadataUrl}}, (data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
    })
}

const updateOpensea = async (nftId: number) => {
    return new Promise((resolve, reject) => {
        Http.get(
            "https://testnets-api.opensea.io/api/v1",
            "/asset/:collectionAddress/:tokenId",
            null,
            {
                path: {collectionAddress: config.WORD_ADDRESS, tokenId: nftId.toString()},
                query: {force_update: "true"}
            }, (data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
    })
}

function buildSupply(file: string): string[] {
    const input: string = fs.readFileSync(file, 'utf8')
    const supply: WordSupply[] = input.split("\n").map(line => {
        const [word, supply] = line.split(",")
        return {word, supply: parseInt(supply)}
    })
    console.log("supply: ", supply)
    const words: string[] = []
    supply.forEach(it => {
        for (let i = 0; i < it.supply; i++) {
            words.push(it.word)
        }
    })

    return words
}

function revealWords(startId: number, words: string[], output: string) {
    let id: number = startId

    const nfts: WordNft[] = []
    for (let i = 0; i < words.length; i++) {
        id++
        const word = words[i]
        const position = i % 5
        console.log(`draw ${word} at ${position}`)
        const image = craftWordNFT([{text: word, row: position}])
        fs.writeFileSync(`${output}/word_${id}.png`, image)
        nfts.push({
            id: id,
            name: `Word #${id}`,
            path: `word_${id}.png`,
            position: position,
            word: word
        })
    }
    return nfts
}

async function uploadWords(nfts: WordNft[], directory: string) {
    const files = await filesFromPath(directory, {
        pathPrefix: path.resolve(directory),
        hidden: true
    })
    const cid = await nftStorageClient.storeDirectory(files)
    console.log(cid)
    const status = await nftStorageClient.status(cid)
    console.log(status)
    const http = cid.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
    console.log(`nft at ${http}`)
    for (const nft of nfts) {
        const imageUrl = `${http}/${nft.path}.png`
        await metadataClient.token.updateMetadata(
            {
                chainId: Blockchain.ETHEREUM,
                collectionAddress: config.WORD_ADDRESS,
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
        const metadataUrl = `${config.METADATA_URL}/metadata/${Blockchain.ETHEREUM}/${config.WORD_ADDRESS}/${nft.id.toString()}`
        console.log(`metadata updated for ${metadataUrl}`)
        await createWord(nft.id, imageUrl, metadataUrl)
        console.log("word created")
        await updateOpensea(nft.id)
        console.log("opensea updated")
    }
}

async function run() {
    console.log("start")
    const input = "./input/word-supply.csv"
    const output = "./output"
    const words = buildSupply(input)
    console.log("words", words)
    const nfts = revealWords(0, words, output)
    await uploadWords(nfts, output)
}

run()
    .then()
    .catch(e => console.log)