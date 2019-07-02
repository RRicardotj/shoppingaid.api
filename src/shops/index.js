const express = require('express');
const router = express.Router();
const withCatchAsync = require('../utils/catchAsyncErrors');

const {
  createHandler,
  shopHandler,
  showHandler,
  deleteHandler,
  addArticleHandler,
} = require('./handler');

router.post('/', withCatchAsync(createHandler));
router.get('/', withCatchAsync(shopHandler));
router.get('/:id(\\d+)', withCatchAsync(showHandler));
router.delete('/:id(d\\+)', withCatchAsync(deleteHandler));
router.put('/:id(d\\+)', withCatchAsync(addArticleHandler));

module.exports = router;
