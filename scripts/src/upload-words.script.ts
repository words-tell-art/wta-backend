import 'dotenv/config'
import {Blockchain, Client as MetadataClient} from "@d-lab/metadata"
import * as fs from "fs"
import {Auth, Http} from "@d-lab/common-kit"

interface WordNft {
    id: number
    name: string
    word: string
    position: number
    color: { key: string, value: string }
    path: string
}

const config = {
    METADATA_API_KEY: process.env.METADATA_API_KEY!,
    WTA_API_KEY: process.env.WTA_API_KEY!,
    STORAGE_API_KEY: process.env.STORAGE_API_KEY!,
    WORD_ADDRESS: process.env.WORD_ADDRESS!,
    METADATA_URL: process.env.METADATA_URL!,
    WTA_URL: process.env.WTA_URL!
}

const createWord = async (nftId: number, word: string, metadata) => {
    return new Promise((resolve, reject) => {
        Http.post(
            config.WTA_URL,
            "/words",
            Auth.apiKey(config.WTA_API_KEY),
            {body: {nftId, word, metadata}}, (data) => {
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

async function uploadWords(nfts: WordNft[], cid: string) {
    console.log("config: ", config)
    const metadataClient = new MetadataClient(config.METADATA_URL, config.METADATA_API_KEY)
    let http
    if (cid.startsWith("ipfs")) {
        http = cid.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
    } else {
        http = `https://ipfs.io/ipfs/${cid}`
    }
    console.log(`nft at ${http}`)
    for (const nft of nfts) {
        const imageUrl = `${http}/${nft.path}`
        const metadata = {
            name: nft.name,
            description: "A word to be chosen carefully.",
            imageUrl: imageUrl,
            externalUrl: "",
            animationUrl: "",
            properties: {
                w1: nft.position == 0 ? nft.word : "",
                w2: nft.position == 1 ? nft.word : "",
                w3: nft.position == 2 ? nft.word : "",
                w4: nft.position == 3 ? nft.word : "",
                w5: nft.position == 4 ? nft.word : "",
                hue: nft.color.key,
                initial : nft.word.slice(0, 1).toUpperCase()
            }
        }
        await metadataClient.token.updateMetadata(
            {
                chainId: Blockchain.ETHEREUM,
                collection: config.WORD_ADDRESS,
                tokenId: nft.id.toString()
            }, metadata)
        const metadataUrl = `${config.METADATA_URL}/metadata/${Blockchain.ETHEREUM}/${config.WORD_ADDRESS}/${nft.id.toString()}`
        console.log(`metadata updated for ${metadataUrl}`)
        await createWord(nft.id, nft.word, metadata)
        console.log("word created")
        await updateOpensea(nft.id)
        console.log("opensea updated")
    }
}

async function run(cid: string, version: string) {
    const nfts = JSON.parse(fs.readFileSync(`./output/${version}/words.json`, 'utf8'))
    await uploadWords(nfts, cid)
}

if (process.argv.length < 4) {
    console.log("Usage: upload-word <ipfs-cid> <ipfs-version>")
    process.exit(1)
}

run(process.argv[2], process.argv[3])
    .then()
    .catch(e => console.log(e))