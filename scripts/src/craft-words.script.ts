import * as fs from "fs"
import {craftWordNFT} from "./utils/word.generator"

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
        const image = craftWordNFT([{text: word, row: position}])
        fs.writeFileSync(`${output}/word_${id}.png`, image)
        nfts.push({
            id: id,
            name: `Words Tell Art #${id}`,
            path: `word_${id}.png`,
            position: position,
            word: word
        })
    }
    return nfts
}

async function run() {
    console.log("start craft")
    const input = "./input/word-supply.csv"
    const output = "./output/words"
    const words = buildSupply(input)
    console.log("words", words)
    const nfts = revealWords(0, words, output)
    console.log("nfts", nfts)
    fs.writeFileSync(`./output/words.json`, JSON.stringify(nfts))
}

run()
    .then()
    .catch(e => console.log(e))