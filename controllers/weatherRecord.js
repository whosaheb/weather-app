const Weather = require("../models/weatherRecord");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Weather
    const weatherRecord = ({
        location: req.body.location,
        temp: req.body.temp,
        pressure: req.body.pressure,
        humidity: req.body.humidity
    });

    // Save Weather in the database
    Weather.create(weatherRecord, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Weather."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const location = req.query.location;
    const timefrom = req.query.weather;
    const timeto = req.query.weather;
    const mintemp = req.query.weather;
    const maxtemp = req.query.maxtemp;

    Weather.getAll(location, timefrom, timeto, mintemp, maxtemp, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving weather."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Weather.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Weather with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Weather with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Weather.updateById(
        req.params.id,
        new Weather(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Weather with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Weather with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Weather.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Weather with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Weather with id " + req.params.id
                });
            }
        } else res.send({ message: `Weather was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Weather.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all weather."
            });
        else res.send({ message: `All Weathers were deleted successfully!` });
    });
};