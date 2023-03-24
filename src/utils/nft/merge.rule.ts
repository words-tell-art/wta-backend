import {isEmpty, merge, throwIfNot} from "@d-lab/common-kit"
import Errors from "../errors/Errors"
import {Art, Word} from "../../interfaces"

export interface MergedNFT {
    image: string | null
    words: string[]
    properties: {[key: string]: string | number | boolean | Date | undefined}
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
        image: null,
        properties: props
    }
}

export function mergeArt(arts: Art[], ids: number[]): MergedNFT {
    throwIfNot(arts.length != 2, Errors.INVALID_ART_Craft(`ArtMerge: one art hasn't been found from [${JSON.stringify(ids)}].`))
    const props = {
        ...arts[0].metadata.properties,
        w1: arts[0].metadata.properties["w1"] || arts[1].metadata.properties["w1"],
        w2: arts[1].metadata.properties["w2"] || arts[0].metadata.properties["w2"],
        w3: arts[0].metadata.properties["w3"] || arts[1].metadata.properties["w3"],
        w4: arts[1].metadata.properties["w4"] || arts[0].metadata.properties["w4"],
        w5: arts[0].metadata.properties["w5"] || arts[1].metadata.properties["w5"],
        generation: arts[0].metadata.properties["generation"] > arts[1].metadata.properties["generation"] ? arts[0].metadata.properties["generation"] : arts[1].metadata.properties["generation"]
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
        properties: props
    }
}