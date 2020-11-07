const express = require('express');

const ta03Controller = require('../controllers/ta03');

const router = express.Router();

router.get('/', ta03Controller.getIndex);

router.post('/search-product', ta03Controller.postSearchProducts);

module.exports = router;

module.exports = router;