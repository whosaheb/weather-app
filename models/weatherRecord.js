const weatherRecord = require("../routes/weatherRecord");
const sql = require("./db");

const Wheather = function (weather) {
    this.location = weather.location;
    this.temp = weather.temp;
    this.pressure = weather.pressure;
    this.humidity = weather.humidity;
};

weatherRecord.create = (newWeather, result) => {
    sql.query("INSERT INTO weather_report SET ?", newWeather, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("new Weather created: ", { id: res.insertId, ...newWeather });
        result(null, { id: res.insertId, ...newWeather });
    });
};

weatherRecord.getAll = (location, timefrom, timeto, maxtemp, mintemp, result) => {
    let query = "SELECT * FROM weather_report";

    if(location || timefrom || timeto || maxtemp || mintemp){
        query += ` WHERE`;
    }
    if (location) {
        query += ` location LIKE '%${location}%'`;
    }
    if(location && timefrom){
        query += ` AND`;
    }
    if (timefrom) {
        query += ` datetime >= '${timefrom}'`;
    }
    if((location || timefrom) && timeto){
        query += ` AND`;
    }
    if (timeto) {
        query += ` datetime <= '${timeto}'`;
    }
    if((location || timefrom || timeto) && maxtemp){
        query += ` AND`;
    }
    if (maxtemp) {
        query += ` temp >= '${maxtemp}'`;
    }
    if((location || timefrom || timeto || maxtemp) && mintemp){
        query += ` AND`;
    }
    if (mintemp) {
        query += ` temp <= '${mintemp}'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("weather is: ", res);
        result(null, res);
    });
};

weatherRecord.findById = (id, result) => {
    sql.query(`SELECT * FROM weather_report WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Weather: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Weather with the id
        result({ kind: "not_found" }, null);
    });
};

weatherRecord.updateById = (id, weather, result) => {
    sql.query(
        "UPDATE weather_report SET location = ?, temp = ?, pressure = ?, humidity = ?, WHERE id = ?",
        [weather.location, weather.temp, weather.pressure, weather.humidity, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Weather with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated weather: ", { id: id, ...weather });
            result(null, { id: id, ...weather });
        }
    );
};

weatherRecord.remove = (id, result) => {
    sql.query("DELETE FROM weather_report WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Weather with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted weather with id: ", id);
        result(null, res);
    });
};

weatherRecord.removeAll = result => {
    sql.query("DELETE FROM weather_report", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} weathers`);
        result(null, res);
    });
};


module.exports = weatherRecord;