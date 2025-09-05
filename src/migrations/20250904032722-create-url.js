'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("url", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      url_xbox: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_psn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_steam: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_nintendo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_twitch: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_retro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      data_modificacao: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("url")
  }
};
