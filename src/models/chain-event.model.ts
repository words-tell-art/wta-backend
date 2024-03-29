import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {ChainEvent} from "../interfaces"
import EventArguments from "../interfaces/event-arguments.interface"
import {EventName} from "../enums"

export type ChainEventCreationAttributes = Optional<ChainEvent, "id" | "createdAt" | "updatedAt">

export default class ChainEventModel extends Model<ChainEvent, ChainEventCreationAttributes> implements ChainEvent {
	public id: number
	public blockNumber: number
	public event: EventName
	public arguments: string
	public createdAt: Date
	public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof ChainEventModel => {
    // Init all models
    ChainEventModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        blockNumber: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        event: {
            allowNull: false,
            type: DataTypes.STRING
        },
        arguments: {
            allowNull: false,
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
        modelName: "chain_events",
        sequelize,
        timestamps: true
    })
    return ChainEventModel
}