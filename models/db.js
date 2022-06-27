const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db.config.js");


const pool = {
    connectionLimit: 10,    
    password: dbConfig.PASSWORD,
    user: dbConfig.USER,
    database: dbConfig.DB,
    host: dbConfig.HOST,
    port: dbConfig.PORT  
}; 

const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    logging: false
});

try {
    database.authenticate();
    console.log('Database connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = database;