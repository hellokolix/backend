const Sequelize = require('sequelize');
const db = {};

const sequelize =   new Sequelize(
    process.env.CLEARDB_DATABASE_URL, {
    dialect: "mysql",
    pool:{
        min:0,
        max:25,
        aquire: 30000,
        idle: 1000
    },
    dialectOptions: {
        // @see https://github.com/sequelize/sequelize/issues/8019
        decimalNumbers: true,
        maxPreparedStatements: 100
    },
   } 
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 