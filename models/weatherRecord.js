const dbQuery = require("./db");

async function postWeather(val) {
    try {
        const result = await dbQuery(`INSERT INTO weather_report (state, temp, pressure, humidity) values (${val.state}, ${val.temp}, ${val.pressure}, ${val.humidity})`);
        return result;
    } catch(error) {
        console.error(error);
    }
}

async function getWeather() {
    try {
        const result = await dbQuery(`SELECT * FROM weather_report`);
        return result;
    } catch(error) {
        console.error(error);
    }
}

async function updateWeather(params) {
    try {
        const result = await dbQuery("UPDATE `weather_report` SET `state` = '" + params.state + "', `temp` = '"+params.temp+"', `pressure` = "+params.pressure+", `humidity` = "+params.humidity+" WHERE `weather_report`.`id` = "+params.id);
        return result;
    } catch(error) {
        console.error(error);
    }
}
async function deleteWeather(params) {
    try {
        const result = await dbQuery("DELETE FROM `weather_report` WHERE `weather_report`.`id` = " + params.id);
        return result;
    } catch(error) {
        console.error();(error);
    }
}

module.exports = {postWeather, getWeather, updateWeather, deleteWeather};
