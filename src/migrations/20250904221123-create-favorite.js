'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favorite", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      primeiro_jogo_titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primeiro_jogo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      segundo_jogo_titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      segundo_jogo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      terceiro_jogo_titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      terceiro_jogo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quarto_jogo_titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quarto_jogo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quinto_jogo_titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quinto_jogo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      data_modificacao: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("favorite")
  }
};
