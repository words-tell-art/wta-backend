import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {WordSupply} from "../interfaces"

export type WordSupplyCreationAttributes = Optional<WordSupply, "id" | "createdAt" | "updatedAt">

export default class WordSupplyModel extends Model<WordSupply, WordSupplyCreationAttributes> implements WordSupply {
	public id: number
	public word: string
	public consumed: boolean
	public createdAt: Date
	public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof WordSupplyModel => {
    // Init all models
    WordSupplyModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        word: {
            allowNull: false,
            type: DataTypes.STRING
        },
        consumed: {
            allowNull: false,
            type: DataTypes.BOOLEAN
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
        modelName: "word-supply",
        sequelize,
        timestamps: true
    })
    return WordSupplyModel
}