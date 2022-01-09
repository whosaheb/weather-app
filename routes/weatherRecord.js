const express = require("express");
const router = express.Router();

const {read, create, update, remove} = require("../controllers/weatherRecord");

// const { requireLogin, isAdmin, isAuth } = require("../controllers/auth");


router.post('/', create);
// router.get('/', requireLogin, getall);
router.get('/', read);
router.put('/', update);
router.delete('/', remove);


module.exports = router;