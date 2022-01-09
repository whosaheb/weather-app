const {getWeather, postWeather, updateWeather, deleteWeather} = require("../models/weatherRecord");

async function read(req, res, next) {
    try {
        res.json(await getWeather());
    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        next(err);
    }
};

async function create(req, res, next) {
    console.log(req.body+"ihjg");
    try {
        res.json(await postWeather(req.body));
        
    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        next(err);
    }
};

async function update(req, res, next) {
    try {
        res.json(await updateWeather(req.body));
    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        next(err);
    }
};

async function remove(req, res, next) {
    try {
        res.json(await deleteWeather(req.query));
    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        next(err);
    }
};

module.exports = {read, create, update, remove};
