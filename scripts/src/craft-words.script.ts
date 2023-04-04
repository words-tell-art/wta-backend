import * as fs from "fs"
import {craftWordNFT} from "./utils/word.generator"

interface WordSupply {
    word: string
    supply: number
}
interface WordRequest {
    word: string
    color: {key: string, value: string}
    position: number
}

interface WordNft {
    id: number
    name: string
    word: string
    position: number
    color: {key: string, value: string}
    path: string
}

const colors = {
    green: "#00FF66",
    purple: "#BD00FF",
    red: "#FF3D00",
    yellow: "#FAFF00",
    blue: "#00C2FF"
}

const rarity = [
    20, 40, 50, 80, 100
]

function getRandomColor(): {key: string, value: string} {
    const keys = Object.keys(colors)
    const random = Math.floor(Math.random() * 100)
    let index = 0
    while (random > rarity[index]) {
        index++
    }
    return {key: keys[index], value: colors[keys[index]]}
}

function buildSupply(file: string): WordRequest[] {
    const input: string = fs.readFileSync(file, 'utf8')
    const supply: WordSupply[] = input.split("\n").map(line => {
        const [word, supply] = line.split(",")
        return {word, supply: parseInt(supply)}
    })
    const words: WordRequest[] = []
    supply.forEach(it => {
        for (let i = 0; i < it.supply; i++) {
            words.push({
                word: it.word,
                color: getRandomColor(),
                position: i % 5
            })
        }
    })
    return words
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}

function revealWords(startId: number, words: WordRequest[], output: string): WordNft[] {
    let id: number = startId

    const nfts: WordNft[] = []
    for (let i = 0; i < words.length; i++) {
        id++
        const word = words[i]
        const image = craftWordNFT([{text: word.word, row: word.position, color: word.color.value}])
        fs.writeFileSync(`${output}/word_${id}.png`, image)
        nfts.push({
            id: id,
            name: `Words Tell Art #${id}`,
            path: `word_${id}.png`,
            position: word.position,
            word: word.word,
            color: word.color
        })
    }
    return nfts
}

async function run(startId: number, version: number) {
    console.log("start craft")
    const input = "./input/word-supply.csv"
    const output = `./output/${version}/words`
    fs.mkdirSync(output, {recursive: true})
    const words = buildSupply(input)
    fs.writeFileSync(`./output/${version}/words_supply.json`, JSON.stringify(words))
    const nfts = revealWords(0, words, output)
    console.log("nfts", nfts)
    fs.writeFileSync(`./output/${version}/words.json`, JSON.stringify(nfts))
}

let startId = 0
let version = 1
if (process.argv.length === 3) {
    startId = parseInt(process.argv[2])
} else if (process.argv.length === 4) {
    version = parseInt(process.argv[3])
} else {
    console.log("Usage: craft-word <startId><version>")
    process.exit(1)
}

run(startId, version)
    .then()
    .catch(e => console.log(e))