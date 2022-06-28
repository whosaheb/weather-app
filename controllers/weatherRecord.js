const Weather = require("../models/weatherRecord");
const { Op } = require('sequelize')
const list = async (req, res) => {
    try {
        let query = {};
        let {page, limit, state} = req.query;
        if(!limit) limit = 10;
        if(!page) page = 1;
        if(state) query.state = { [Op.like]: `%${state}%`};
        // console.log(query);
        let offset = (page - 1) * limit;
        // SELECT column FROM table LIMIT {someLimit} OFFSET {someOffset};
        let result = await Weather.findAll({ offset:offset, limit: parseInt(limit), where: query });
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
