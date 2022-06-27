const express = require("express");
const router = express.Router();

const {list, create, update, remove} = require("../controllers/weatherRecord");

// const { requireLogin, isAdmin, isAuth } = require("../controllers/auth");


router.post('/weather-report/', create);
router.get('/weather-reports/', list);
router.put('/weather-report/:id', update);
router.delete('/weather-report/:id', remove);


module.exports = router;