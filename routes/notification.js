const express = require('express');
const router = express.Router();

const controllersNot = require('../controllers/notification');

router.post('/', controllersNot.post);

router.get('/getall/:id', controllersNot.getAll);

router.get('/:id', controllersNot.getById);

router.put('/markall/:id', controllersNot.markAllSeen);

router.put('/:id', controllersNot.markOne);

router.delete('/:id', controllersNot.removeOne);

router.delete('/deleteall/:id', controllersNot.removeAll);

module.exports = router;
