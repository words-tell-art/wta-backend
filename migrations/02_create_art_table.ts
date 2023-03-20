import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("arts", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nft_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        metadata: {
            allowNull: false,
            type: DataTypes.JSON
        },
        parent_ids: {
            allowNull: false,
            type: DataTypes.JSON
        },
        parent_type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        word_ancestors: {
            allowNull: false,
            type: DataTypes.JSON
        },
        art_ancestors: {
            allowNull: false,
            type: DataTypes.JSON
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
    await queryInterface.dropTable("arts")
}
