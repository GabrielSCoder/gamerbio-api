'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      texto_bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_modificacao: {
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario")
  }
};
