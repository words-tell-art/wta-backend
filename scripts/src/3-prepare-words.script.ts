import * as fs from "fs"
import {craftWordNFT} from "./utils/word.generator"
import {colorRarity, colorHex} from "./utils/colors"

interface WordSupply {
    word: string
    supply: number
}
interface WordRequest {
    word: string
    color: {key: string, value: string}
    position: number
}

function getRandomColor(): {key: string, value: string} {
    const keys = Object.keys(colorHex)
    const random = Math.floor(Math.random() * 100)
    let index = 0
    while (random > colorRarity[index]) {
        index++
    }
    return {key: keys[index], value: colorHex[keys[index]]}
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

async function run(version: number) {
    const input = "./input/words-supply.csv"
    const output = `./input/${version}`
    fs.mkdirSync(output, {recursive: true})
    const words = buildSupply(input)
    fs.writeFileSync(`${output}/words_supply.json`, JSON.stringify(words))
}

let version = 1
if (process.argv.length === 3) {
    version = parseInt(process.argv[2])
} else {
    console.log("Usage: prepare-word <version>")
    process.exit(1)
}

run(version)
    .then()
    .catch(e => console.log(e))