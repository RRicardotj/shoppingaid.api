const express = require('express');
const router = express.Router();

router.use('/shops', require('./src/shops'));

module.exports = router;
