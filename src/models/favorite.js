'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        static associate(models) {
            Favorite.belongsTo(models.Usuario, {
                foreignKey: "usuario_id",
                as: "usuario",
            });
        }
    }

    Favorite.init(
        {
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            primeiro_jogo_titulo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            primeiro_jogo_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            segundo_jogo_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            segundo_jogo_titulo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            terceiro_jogo_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            terceiro_jogo_titulo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            quarto_jogo_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            quarto_jogo_titulo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            quinto_jogo_titulo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            quinto_jogo_url: {
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
            modelName: "Favorite",
            tableName: "favorite",
            timestamps: false,
        }
    );

    return Favorite;
};