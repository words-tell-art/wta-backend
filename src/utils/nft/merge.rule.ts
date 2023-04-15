import {isEmpty, isNotEmpty, merge, numberOfDays, throwIf} from "@d-lab/common-kit"
import Errors from "../errors/Errors"
import {Art, Word} from "../../interfaces"
import {colorHex, hexToRgb, RGB} from "../colors"
import blockchainConfig from "../../config/blockchain.config"

export type MetadataProps = { [key: string]: string | number | boolean | Date | undefined }

export interface MergedNFT {
    image: string | null
    words: string[]
    hues: string[]
    properties: MetadataProps
}

export function mergeColors(colors: string[]): RGB | null {
    let result: RGB | null = null
    for (const color of colors) {
        const hex = colorHex[color]
        if (result === null) {
            result = hexToRgb(hex)
        } else {
            result.add(hexToRgb(hex))
        }
    }
    return result
}

function mergeHues(hue1: string, hue2: string, hue3: string, hue4: string, hue5: string, hue6: string, hue7: string, hue8: string): { hue1: string, hue2: string, hue3: string, hue4: string } {
    const priority: string[] = [hue1, hue5, hue2, hue6, hue3, hue7, hue4, hue8]
    let current = 0
    const result = ["", "", "", ""]
    for (const hue of priority) {
        if (current === 3) break
        if (isNotEmpty(hue)) {
            result[current] = hue
            current++
        }
    }
    return {
        hue1: result[0],
        hue2: result[1],
        hue3: result[2],
        hue4: result[3],
    }
}

export function craftArt(words: Word[], ids: number[]): MergedNFT {
    throwIf(words.length < 2, Errors.INVALID_ART_Craft(`ArtCraft: only ${words.length} found from [${JSON.stringify(ids)}].`))
    let props = {}
    for (const word of words) {
        props = merge(props, {
            w1: word.metadata.properties.w1,
            w2: word.metadata.properties.w2,
            w3: word.metadata.properties.w3,
            w4: word.metadata.properties.w4,
            w5: word.metadata.properties.w5
        }, true)
    }
    const hues = words.map(word => word.metadata.properties.hue)
    props["hue1"] = mergeColors(hues)?.hue()
    props["hue2"] = ""
    props["hue3"] = ""
    props["hue4"] = ""
    props["generation"] = 0
    props["date"] = numberOfDays(new Date(blockchainConfig.CRAFT_LAUNCH_DATE), new Date())
    return {
        words: [
            props["w1"],
            props["w2"],
            props["w3"],
            props["w4"],
            props["w5"]
        ],
        image: null,
        properties: props,
        hues: [props["hue1"], props["hue2"], props["hue3"], props["hue4"]]
    }
}

export function mergeArt(arts: Art[], ids: number[]): MergedNFT {
    throwIf(arts.length != 2, Errors.INVALID_ART_Craft(`ArtMerge: one art hasn't been found from [${JSON.stringify(ids)}].`))
    const props = {
        ...arts[0].metadata.properties,
        w1: isNotEmpty(arts[0].metadata.properties["w1"]) ? arts[0].metadata.properties["w1"] : arts[1].metadata.properties["w1"],
        w2: isNotEmpty(arts[1].metadata.properties["w2"]) ? arts[1].metadata.properties["w2"] : arts[0].metadata.properties["w2"],
        w3: isNotEmpty(arts[0].metadata.properties["w3"]) ? arts[0].metadata.properties["w3"] : arts[1].metadata.properties["w3"],
        w4: isNotEmpty(arts[1].metadata.properties["w4"]) ? arts[1].metadata.properties["w4"] : arts[0].metadata.properties["w4"],
        w5: isNotEmpty(arts[0].metadata.properties["w5"]) ? arts[0].metadata.properties["w5"] : arts[1].metadata.properties["w5"],
        generation: parseInt((arts[0].metadata.properties["generation"] > arts[1].metadata.properties["generation"] ? arts[0].metadata.properties["generation"] : arts[1].metadata.properties["generation"]).toString()) + 1,
        ...mergeHues(
            arts[0].metadata.properties["hue1"],
            arts[0].metadata.properties["hue2"],
            arts[0].metadata.properties["hue3"],
            arts[0].metadata.properties["hue4"],
            arts[1].metadata.properties["hue1"],
            arts[1].metadata.properties["hue2"],
            arts[1].metadata.properties["hue3"],
            arts[1].metadata.properties["hue4"]
        )
    }
    return {
        words: [
            props.w1,
            props.w2,
            props.w3,
            props.w4,
            props.w5
        ],
        image: isEmpty(arts[1].metadata.imageUrl) ? null : arts[1].metadata.imageUrl,
        properties: props,
        hues: [props.hue1, props.hue2, props.hue3, props.hue4]
    }
}