const express = require('express');
const router = express.Router();

const thenearestController = require('../controllers/thenearest');

router.post('/', thenearestController.thenearest);

module.exports = router;
