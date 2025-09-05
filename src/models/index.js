const dotenv = require("dotenv");
const pg = require("pg")
dotenv.config();
const { Sequelize } = require("sequelize");
const config = require("../config/config.js")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.database, config.username, config.password, config, { dialectModule: pg });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require("./usuario.js")(sequelize, Sequelize.DataTypes);
db.Url = require("./url.js")(sequelize, Sequelize.DataTypes);
db.Favorite = require("./favorite.js")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
