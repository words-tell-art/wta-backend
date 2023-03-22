import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("chain_events", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        block_number: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        event: {
            allowNull: false,
            type: DataTypes.STRING
        },
        arguments: {
            allowNull: false,
            type: DataTypes.JSON
        },
        processed: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        processed_by_request: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("chain_events")
}
