const express = require('express');
const router = express.Router();
const withCatchAsync = require('../utils/catchAsyncErrors');

const {
  createHandler,
  listShopHandler,
  showHandler,
  deleteHandler,
  addArticleHandler,
} = require('./handler');

router.post('/', withCatchAsync(createHandler));
router.get('/', withCatchAsync(listShopHandler));
router.get('/:id', withCatchAsync(showHandler));
router.delete('/:id', withCatchAsync(deleteHandler));
router.put('/:id', withCatchAsync(addArticleHandler));

module.exports = router;
