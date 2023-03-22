import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {ArtRequest} from "../interfaces"

export type ArtRequestCreationAttributes = Optional<ArtRequest, "id" | "createdAt" | "updatedAt">

export default class ArtRequestModel extends Model<ArtRequest, ArtRequestCreationAttributes> implements ArtRequest {
	public id: number
	public chainEventId: number
	public nftId: number
	public status: number
	public imageUrl: string | null
	public createdAt: Date
	public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof ArtRequestModel => {
    // Init all models
    ArtRequestModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        chainEventId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        nftId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        status: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        imageUrl: {
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
        modelName: "art_requests",
        sequelize,
        timestamps: true
    })
    return ArtRequestModel
}