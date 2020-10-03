const express = require('express');

const router = express.Router();

const path = require('path');

const p03Controller = require('../controllers/prove03');

router.get('/', p03Controller.getProve03);

router.post('/productDetails/:productId', p03Controller.getProductDetails);

module.exports = router;