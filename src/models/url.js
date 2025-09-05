'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Url extends Model {
        static associate(models) {
            Url.belongsTo(models.Usuario, {
                foreignKey: "usuario_id",
                as: "usuario",
            });
        }
    }

    Url.init(
        {
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            url_xbox: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            url_psn: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            url_steam: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            url_nintendo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            url_twitch: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            url_retro: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            data_criacao: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            data_modificacao: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            modelName: "Url",
            tableName: "url",
            timestamps: false,
        }
    );

    return Url;
};