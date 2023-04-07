import * as fs from "fs"

interface Supply {
    word: string
    supply: number
}

function toCSV(supply: Supply[]): string {
    return supply.map(it => `${it.word},${it.supply}`).join("\n")
}

function buildSupply(data: string, quantity: number): Supply[] {
    return data.split("\n").map(line => {
        return {word: line.replace(/(\r\n|\n|\r)/gm, ""), supply: quantity}
    })
}

function mergeToExisting(supply: Supply[]): Supply[] {
    const existingInput = "./input/words-supply.csv"
    const existingSupply = fs.existsSync(existingInput)
    const existing: Supply[] = []
    if (existingSupply) {
        fs.readFileSync(existingInput, 'utf8')
            .split("\n")
            .forEach(line => {
                const [word, supply] = line.split(",")
                existing.push({word, supply: parseInt(supply)})
            })
    }
    const existingMap: Map<string, number> = new Map()
    existing.forEach(it => existingMap.set(it.word, it.supply))
    supply.forEach(it => {
        existingMap.set(it.word.charAt(0).toUpperCase() + it.word.slice(1), it.supply)
    })
    return [...existingMap.entries()].map(([word, supply]) => ({word, supply}))
}

async function run(file) {
    const input = `./input/words/${file}.txt`
    const content: string = fs.readFileSync(input, 'utf8')
    const supply: Supply[] = buildSupply(content, 5)
    const result = mergeToExisting(supply)
    const csv = toCSV(result)
    fs.writeFileSync(`./input/words-supply.csv`, csv)
}

if (process.argv.length < 3) {
    console.log("Usage: craft-word <startId><version>")
    process.exit(1)
}

run(process.argv[2])
    .then()
    .catch(e => console.log(e))