var database = require('./db');  // importing connection database
var { DataTypes } = require('sequelize');

var Weather = database.define('weather_report', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        state: DataTypes.STRING,
        temp: DataTypes.FLOAT,
        pressure: DataTypes.INTEGER,
        humidity: DataTypes.INTEGER,
    },
    { timestamps:true }
);

Weather.sync()

module.exports = Weather;
