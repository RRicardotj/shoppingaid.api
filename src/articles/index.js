const express = require('express');
const router = express.Router();
const withCatchAsync = require('../utils/catchAsyncErrors');
const {
  createHandler,
  updateHandler,
  removeHandler,
} = require('./handlers');

router.post('/', withCatchAsync(createHandler));
router.put('/:id', withCatchAsync(updateHandler));
router.delete('/:id', withCatchAsync(removeHandler));

module.exports = router;
