import {mergeColors} from "../src/utils/nft/merge.rule"

describe("Colors", () => {
    test("Merge to blue", done => {
        expect(mergeColors(["blue", "blue"])!.hue()!).toEqual("blue")
        done()
    })
    test("Merge to blue2", done => {
        expect(mergeColors(["blue", "green"])!.hue()!).toEqual("blue")
        done()
    })
    test("Merge to blue3", done => {
        expect(mergeColors(["green", "blue"])!.hue()!).toEqual("blue")
        done()
    })
    test("Merge to blue5", done => {
        expect(mergeColors(["purple", "green"])!.hue()!).toEqual("blue")
        done()
    })
    test("Merge to green", done => {
        expect(mergeColors(["blue", "yellow"])!.hue()!).toEqual("green")
        done()
    })
    test("Merge to green2", done => {
        expect(mergeColors(["yellow", "blue"])!.hue()!).toEqual("green")
        done()
    })
    test("Merge to orange", done => {
        expect(mergeColors(["red", "yellow"])!.hue()!).toEqual("orange")
        done()
    })
    test("Merge to orange2", done => {
        expect(mergeColors(["yellow", "red"])!.hue()!).toEqual("orange")
        done()
    })
    test("Merge to purple", done => {
        expect(mergeColors(["red", "blue"])!.hue()!).toEqual("purple")
        done()
    })
    test("Merge to purple2", done => {
        expect(mergeColors(["blue", "red"])!.hue()!).toEqual("purple")
        done()
    })
    test("Merge to purple3", done => {
        expect(mergeColors(["purple", "red"])!.hue()!).toEqual("purple")
        done()
    })
    test("Merge to yellow", done => {
        expect(mergeColors(["red", "green"])!.hue()!).toEqual("yellow")
        done()
    })
    test("Merge to yellow2", done => {
        expect(mergeColors(["green", "red"])!.hue()!).toEqual("yellow")
        done()
    })
})