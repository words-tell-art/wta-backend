import {isEmpty, merge, throwIf} from "@d-lab/common-kit"
import Errors from "../errors/Errors"
import {Art, Word} from "../../interfaces"
import {hexToRgb, RGB} from "../colors"

export interface MergedNFT {
    image: string | null
    words: string[]
    hues: string[]
    properties: { [key: string]: string | number | boolean | Date | undefined }
}

export function mergeColors(colors: string[]): RGB | null {
    let result: RGB | null = null
    for (const color of colors) {
        if (result === null) {
            result = hexToRgb(color)
        } else {
            result.add(hexToRgb(color))
        }
    }
    return result
}

export function craftArt(words: Word[], ids: number[]): MergedNFT {
    throwIf(words.length < 2, Errors.INVALID_ART_Craft(`ArtCraft: only ${words.length} found from [${JSON.stringify(ids)}].`))
    let props = {}
    for (const word of words) {
        props = merge(props, word.metadata.properties)
    }
    const hues = words.map(word => word.metadata.properties.hue)
    if (hues.length < 4) {
        props["hue1"] = mergeColors(hues)?.hue()
        props["hue2"] = ""
    } else {
        props["hue1"] = mergeColors(hues.slice(0, 2))?.hue()
        props["hue2"] = mergeColors(hues.slice(3))?.hue()
    }
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
        hues: [props["hue1"]]
    }
}

export function mergeArt(arts: Art[], ids: number[]): MergedNFT {
    throwIf(arts.length != 2, Errors.INVALID_ART_Craft(`ArtMerge: one art hasn't been found from [${JSON.stringify(ids)}].`))
    const props = {
        ...arts[0].metadata.properties,
        w1: arts[0].metadata.properties["w1"] || arts[1].metadata.properties["w1"],
        w2: arts[1].metadata.properties["w2"] || arts[0].metadata.properties["w2"],
        w3: arts[0].metadata.properties["w3"] || arts[1].metadata.properties["w3"],
        w4: arts[1].metadata.properties["w4"] || arts[0].metadata.properties["w4"],
        w5: arts[0].metadata.properties["w5"] || arts[1].metadata.properties["w5"],
        generation: (arts[0].metadata.properties["generation"] > arts[1].metadata.properties["generation"] ? arts[0].metadata.properties["generation"] : arts[1].metadata.properties["generation"]) + 1,
        hue1: arts[0].metadata.properties["hue1"],
        hue2: arts[1].metadata.properties["hue1"]
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
        hues: [props.hue1, props.hue2]
    }
}