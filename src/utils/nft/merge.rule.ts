import {isEmpty, merge, throwIfNot} from "@d-lab/common-kit"
import Errors from "../errors/Errors"
import {Art, Word} from "../../interfaces"

export interface MergedNFT {
    image: string | null
    words: string[]
}

export function craftArt(words: Word[], ids: number[]): MergedNFT {
    throwIfNot(words.length < 2, Errors.INVALID_ART_Craft(`ArtCraft: only ${words.length} found from [${JSON.stringify(ids)}].`))
    let props = {}
    for (const word of words) {
        props = merge(props, word.metadata.properties)
    }
    return {
        words: [
            props["w1"],
            props["w2"],
            props["w3"],
            props["w4"],
            props["w5"]
        ],
        image: null
    }
}

export function mergeArt(arts: Art[], ids: number[]): MergedNFT {
    throwIfNot(arts.length != 2, Errors.INVALID_ART_Craft(`ArtMerge: one art hasn't been found from [${JSON.stringify(ids)}].`))
    return {
        words: [
            arts[0].metadata.properties["w1"] || arts[1].metadata.properties["w1"],
            arts[1].metadata.properties["w2"] || arts[0].metadata.properties["w2"],
            arts[0].metadata.properties["w3"] || arts[1].metadata.properties["w3"],
            arts[1].metadata.properties["w4"] || arts[0].metadata.properties["w4"],
            arts[0].metadata.properties["w5"] || arts[1].metadata.properties["w5"]
        ],
        image: isEmpty(arts[1].metadata.imageUrl) ? null : arts[1].metadata.imageUrl
    }
}