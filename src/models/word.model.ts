import {DataTypes, Model, Optional, Sequelize} from "sequelize"
import {Word} from "../interfaces"
import {MetadataDto} from "@d-lab/metadata"

export type WordCreationAttributes = Optional<Word, "id" | "createdAt" | "updatedAt">

export default class WordModel extends Model<Word, WordCreationAttributes> implements Word {
    public id: number
    public nftId: number
    public word: string
    public metadata: MetadataDto
    public createdAt: Date
    public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof WordModel => {
    // Init all models
    WordModel.init({
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nftId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            word: {
                allowNull: false,
                type: DataTypes.STRING
            },
            metadata: {
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
            modelName: "words",
            sequelize,
            timestamps: true
        })
    return WordModel
}