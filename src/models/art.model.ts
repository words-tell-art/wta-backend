import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {Art} from "../interfaces"

export type ArtCreationAttributes = Optional<Art, "id" | "createdAt" | "updatedAt">

export default class ArtModel extends Model<Art, ArtCreationAttributes> implements Art {
	public id: number
	public nftId: number
	public imageUrl: string | null
	public metadataUrl: string | null
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
        modelName: "arts",
        sequelize,
        timestamps: true
    })
    return ArtModel
}