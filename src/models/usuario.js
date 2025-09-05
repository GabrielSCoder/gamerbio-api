'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {

    check(password) {
      return bcrypt.compareSync(password, this.senha);
    }

    static associate(models) {
      Usuario.hasMany(models.Url, {
        foreignKey: 'usuario_id',
        as: 'urls'
      })

      Usuario.hasMany(models.Favorite, {
        foreignKey: 'usuario_id',
        as: 'favorites'
      })

    }
  }

  Usuario.init({
    usuario: DataTypes.STRING,
    senha: DataTypes.STRING,
    data_nascimento: DataTypes.STRING,
    texto_bio: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    data_modificacao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("senha")) {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        }
      }
    }
  },);
  return Usuario;
};