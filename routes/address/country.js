const express = require('express');
const router = express.Router();

const countryController = require('../../controllers/address/country');
//const isAuth = require('../../middleware/isAuth');

router.post('/', countryController.countryPost);
router.get('/', countryController.countryGetAll);
router.get('/:id', countryController.countryGetById);
router.delete('/:id', countryController.countryDelete);
router.put('/:id', countryController.countryUpdate);

module.exports = router;
