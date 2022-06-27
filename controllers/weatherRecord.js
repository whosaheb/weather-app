const Weather = require("../models/weatherRecord");

const list = async (req, res) => {
    try {
        let result = await Weather.findAll();
        res.json({status:'ok', message: 'success', result});

    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        res.status(504).json({status:'refuse', message: "Server can't handle your request."})
    }
};

const create = async (req, res) => {
    try {
        let data = req.body;
        let result = await Weather.create(data);
        res.json({status:'ok', message: 'success', result});

    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        res.status(504).json({status:'refuse', message: "Server can't handle your request."})
    }
};

const update = async (req, res) => {
    try {
        let id = {id: req.params.id};
        let data = req.body;
        let result = await Weather.update(data, {where: id});
        res.json({status:'ok', message: 'success', result});

    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        res.status(504).json({status:'refuse', message: "Server can't handle your request."})
    }
};

const remove = async (req, res) => {
    try {
        let id = {id: req.params.id};
        let result = await Weather.destroy({where: id });
        res.json({status:'ok', message: 'success', result});

    } catch (err) {
        console.error(`Error while getting Weather Report`, err.message);
        res.status(504).json({status:'refuse', message: "Server can't handle your request."})
    }
};

module.exports = {list, create, update, remove};
