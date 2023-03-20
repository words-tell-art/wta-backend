import {GenealogyDto} from "../api/dtos/art/genealogy"
import db from "../db/database"
import {associateBy, throwIfNull} from "@d-lab/common-kit"
import {TokenType} from "../enums"
import {eq, include} from "@d-lab/api-kit"
import Errors from "../utils/errors/Errors"

export default class GenealogyRepo {

    async get(nftId: number): Promise<GenealogyDto> {
        const nft = await  db.Arts.findOne(eq({nftId}).orderDesc("id").get())
        throwIfNull(nft, Errors.NOT_FOUND_Art(`nftId[${nftId}`))
        const artAncestors = associateBy(await db.Arts.findAll(include({id: nft.artAncestors}).get()), "id")
        const wordAncestors = associateBy(await db.Words.findAll(include({id: nft.artAncestors}).get()), "id")

        const getWord = (id: number): GenealogyDto => {
            const it = wordAncestors[id]
            return {
                id: it!.id,
                nftId: it!.nftId,
                type: TokenType.WORD,
                metadata: it!.metadata,
                parents: [],
                createdAt: it!.createdAt,
                updatedAt: it!.updatedAt
            }
        }

        const getArt = (id: number): GenealogyDto => {
            const it = artAncestors[id]
            let parents: GenealogyDto[]
            if (nft.parentType === TokenType.WORD) {
                parents = nft.parentIds.map(parentId => getWord(parentId))
            } else {
                parents = nft.parentIds.map(parentId => getArt(parentId))
            }
            return {
                id: it!.id,
                nftId: it!.nftId,
                type: TokenType.ART,
                metadata: it!.metadata,
                parents: parents,
                createdAt: it!.createdAt,
                updatedAt: it!.updatedAt
            }
        }

        let parents: GenealogyDto[]
        if (nft.parentType === TokenType.WORD) {
            parents = nft.parentIds.map(parentId => getWord(parentId))
        } else {
            parents = nft.parentIds.map(parentId => getArt(parentId))
        }
        return {
            id: nft!.id,
            nftId: nft!.nftId,
            type: TokenType.ART,
            metadata: nft!.metadata,
            parents: parents,
            createdAt: nft!.createdAt,
            updatedAt: nft!.updatedAt
        }
    }
}