import {craftWordNFT} from "../src/utils/image.generator"

describe("Image Generator", () => {
    test('font test', done => {
        craftWordNFT([{text: "Skyscraper", row: 0}, {text: "Cars", row: 1}, {text: "Mountains", row: 2}, {text: "peace", row: 3}, {text: "war", row: 4}], "0")
        done()
    })
})