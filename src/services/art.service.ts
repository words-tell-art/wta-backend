import db from "../db/database"
import {ArtModel} from "../models"
import {TokenType} from "../enums"
import {eq} from "@d-lab/api-kit"
import {artRepo} from "../repositories"
import {merge} from "@d-lab/common-kit"
import {MetadataDto, PartialMetadataRequest} from "@d-lab/metadata"

export default class ArtService {
    async create(nftId: number, metadata: MetadataDto, parentIds: number[], parentType: TokenType): Promise<ArtModel> {
        if (parentType === TokenType.WORD) {
            return await db.Arts.create({
                nftId: nftId,
                metadata: metadata,
                parentIds: parentIds,
                parentType: parentType,
                wordAncestors: parentIds,
                artAncestors: []
            })
        } else {
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
