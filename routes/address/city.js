const express = require('express');
const router = express.Router();

const cityController = require('../../controllers/address/city');
//const isAuth = require('../../middleware/isAuth');

router.post('/', cityController.cityPost);
router.get('/', cityController.cityGetAll);
router.get('/:id', cityController.cityGetById);
router.delete('/:id', cityController.cityDelete);
router.put('/:id', cityController.cityUpdate);

module.exports = router;
