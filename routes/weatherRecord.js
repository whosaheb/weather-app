module.exports = app => {
    const weather = require("../controllers/weatherRecord");

    var router = require("express").Router();

    // Create a new Location
    router.post("/", weather.create);

    // Retrieve all Location
    router.get("/", weather.findAll);

    // Retrieve a single Location with id
    router.get("/:id", weather.findOne);

    // Update a Location with id
    router.put("/:id", weather.update);

    // Delete a Location with id
    router.delete("/:id", weather.delete);

    // Delete all Location
    router.delete("/", weather.deleteAll);


    app.use('/weather/record', router);
}