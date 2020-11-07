const express = require('express');
const pr08Controller = require('../controllers/pr08');

const router = express.Router();

router.get('/', pr08Controller.getIndex);


module.exports = router;
