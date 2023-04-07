import * as fs from "fs"

function removeDuplicates(words: string[]): string[] {
    const set: Set<string> = new Set()
    words.forEach(word => {
        const final = word.replace(/(\r\n|\n|\r)/gm, "")
        if (final.length <= 12) {
            set.add(final)
        } else {
            console.log("too long: ", final)
        }
    })
    return [...set]
}

function removeBanned(words: string[]): string[] {
    const banned: string[] = []
    const existingBanned: boolean = fs.existsSync("./input/banned-words.txt")
    if (existingBanned) {
        fs.readFileSync("./input/banned-words.txt", 'utf8')
            .split("\n")
            .forEach(word => {
                banned.push(word.replace(/(\r\n|\n|\r)/gm, "").toLowerCase())
            })
    }
    const set: Set<string> = new Set()
    words.forEach(word => {
        const final = word.replace(/(\r\n|\n|\r)/gm, "")
        if (!banned.includes(final.toLowerCase())) {
            set.add(final)
        } else {
            console.log("banned word: ", final)
        }
    })
    return [...set]
}
async function run(file) {
    const input = `./input/words/${file}.txt`
    const content: string = fs.readFileSync(input, 'utf8')
    const single: string[] = removeDuplicates(content.split("\n"))
    const clean: string[] = removeBanned(single)
    fs.writeFileSync(`./input/words/${file}.txt`, clean.join("\n"))
}


if (process.argv.length < 3) {
    console.log("Usage: clean-input <file>")
    process.exit(1)
}

run(process.argv[2])
    .then()
    .catch(e => console.log(e))