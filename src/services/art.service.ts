import db from "../db/database"
import {ArtModel} from "../models"
import {TokenType} from "../enums"
import {eq} from "@d-lab/api-kit"
import Errors from "../utils/errors/Errors"
import {artRepo} from "../repositories"
import {merge, throwIfNot} from "@d-lab/common-kit"
import {MetadataDto, PartialMetadataRequest} from "@d-lab/metadata"

export default class ArtService {
    async create(nftId: number, metadata: MetadataDto, parentIds: number[], parentType: TokenType): Promise<ArtModel> {
        if (parentType === TokenType.WORD) {
            throwIfNot(parentIds.length < 5, Errors.INVALID_ART_Craft(`Can only craft Art with 5 words maximum, not ${parentIds.length}.`))
            return await db.Arts.create({
                nftId: nftId,
                metadata: metadata,
                parentIds: parentIds,
                parentType: parentType,
                wordAncestors: parentIds,
                artAncestors: []
            })
        } else {
            throwIfNot(parentIds.length === 2, Errors.INVALID_ART_Craft(`Can only craft Art from 2 art, not ${parentIds.length}.`))
            const ancestor1 = await artRepo.getBy(eq({nftId: parentIds[0]}).orderDesc("id"))
            const ancestor2 = await artRepo.getBy(eq({nftId: parentIds[1]}).orderDesc("id"))
            return await db.Arts.create({
                nftId: nftId,
                metadata: metadata,
                parentIds: parentIds,
                parentType: parentType,
                wordAncestors: [...ancestor1.wordAncestors, ...ancestor2.wordAncestors],
                artAncestors: [...ancestor1.artAncestors, ...ancestor2.artAncestors]
            })
        }
    }

    async update(nftId: number, metadata: PartialMetadataRequest): Promise<ArtModel> {
        const art = await artRepo.getBy(eq({nftId: nftId}).orderDesc("id"))
        await art.update({
            metadata: merge(art.metadata, metadata)
        })
        return art
    }
}
