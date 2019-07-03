const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API SERVER UP');
});

router.use('/shops', require('./src/shops'));
router.use('/articles', require('./src/articles'));

router.use((err, req, res, next) => { // eslint-disable-line
  res.handleReject(err);
});

module.exports = router;
