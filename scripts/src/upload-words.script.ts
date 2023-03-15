import 'dotenv/config'
import {Blockchain, Client as MetadataClient} from "@d-lab/metadata"
import * as fs from "fs"
import {Auth, Http} from "@d-lab/api-kit"

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

const createWord = async (nftId: number, imageUrl: string, metadataUrl: string) => {
    return new Promise((resolve, reject) => {
        Http.post(
            config.WTA_URL,
            "/words",
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

// const updateMetadata = async (path, body) => {
//     console.log("path:", path)
//     return new Promise((resolve, reject) => {
//         Http.put(config.METADATA_URL, '/metadata/:chainId/:collection/:tokenId',
//             Auth.apiKey(config.SSO_API_KEY),
//             {path: path, body: body},
//             (data) => {
//                 resolve(data)
//             },
//             (error) => {
//                 reject(error)
//             })
//     })
// }


async function uploadWords(nfts: WordNft[], cid: string) {
    console.log("config: ", config)
    const metadataClient = new MetadataClient(config.METADATA_URL, config.SSO_API_KEY)
    let http
    if (cid.startsWith("ipfs")) {
        http = cid.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
    } else {
        http = `https://ipfs.io/ipfs/${cid}`
    }
    console.log(`nft at ${http}`)
    for (const nft of nfts) {
        const imageUrl = `${http}/${nft.path}`
        await metadataClient.token.updateMetadata(
            {
                chainId: Blockchain.ETHEREUM,
                collection: config.WORD_ADDRESS,
                tokenId: nft.id.toString()
            }, {
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

async function run(cid: string) {
    const nfts = JSON.parse(fs.readFileSync("./output/words.json", 'utf8'))
    console.log("nfts", nfts)
    await uploadWords(nfts, cid)
}

if (process.argv.length < 3) {
    console.log("Usage: upload-word <ipfs-cid>")
    process.exit(1)
}

run(process.argv[2])
    .then()
    .catch(e => console.log(e))