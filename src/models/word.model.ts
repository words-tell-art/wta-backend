import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {Word} from "../interfaces"

export type WordCreationAttributes = Optional<Word, "id" | "createdAt" | "updatedAt">

export default class WordModel extends Model<Word, WordCreationAttributes> implements Word {
	public id: number
	public nftId: number
	public imageUrl: string | null
	public metadataUrl: string | null
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
        imageUrl: {
            allowNull: true,
            type: DataTypes.STRING
        },
        metadataUrl: {
            allowNull: true,
            type: DataTypes.STRING
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