import {DataTypes, Model, Optional, Sequelize} from "sequelize"
import {Art} from "../interfaces"
import {TokenType} from "../enums"
import {MetadataDto} from "@d-lab/metadata"

export type ArtCreationAttributes = Optional<Art, "id" | "createdAt" | "updatedAt">

export default class ArtModel extends Model<Art, ArtCreationAttributes> implements Art {
    public id: number
    public nftId: number
    public metadata: MetadataDto
    public parentIds: number[]
    public parentType: TokenType
    public wordAncestors: number[]
    public artAncestors: number[]
    public createdAt: Date
    public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof ArtModel => {
    // Init all models
    ArtModel.init({
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nftId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            metadata: {
                allowNull: false,
                type: DataTypes.JSON
            },
            parentIds: {
                allowNull: false,
                type: DataTypes.JSON
            },
            parentType: {
                allowNull: false,
                type: DataTypes.STRING
            },
            wordAncestors: {
                allowNull: false,
                type: DataTypes.JSON
            },
            artAncestors: {
                allowNull: false,
                type: DataTypes.JSON
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            underscored: true,
            modelName: "arts",
            sequelize,
            timestamps: true
        })
    return ArtModel
}