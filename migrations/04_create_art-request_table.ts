import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("art_requests", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        chain_event_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        block_number: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        nft_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        input_image: {
            allowNull: true,
            type: DataTypes.STRING
        },
        input_words: {
            allowNull: false,
            type: DataTypes.STRING
        },
        input_hues: {
            allowNull: true,
            type: DataTypes.STRING
        },
        state: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        image_url: {
            allowNull: true,
            type: DataTypes.STRING
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
    await queryInterface.dropTable("art_requests")
}
