import {craftWordNFT} from "../src/utils/word.generator"
import craftArtNft from "../src/utils/art.generator"

describe("Image Generator", () => {
    test("craft word", done => {
        craftWordNFT([{text: "skyscraper", row: 0}, {text: "car", row: 1}, {text: "mountain", row: 2}, {text: "peace", row: 3}, {text: "war", row: 4}], "0")
        done()
    })

    test("craft art", done => {
        craftArtNft(["skyscraper", "car", "mountain", "peace", "war"]).then((urls) => {
            console.log("urls", urls)
            done()
        })
    })

})