const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/isAuth');


router.post('/', isAuth, shopController.shopPost);

module.exports = router;
