const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://shoppingaid:${process.env.DB_PASSWORD}@shoppingaid-lrfu9.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
const ShopError = require('../utils/ShopError');



module.exports = {
  createHandler: async (req, res) => {
    const { title } = req.body;

    if (!title) {
      throw new ShopError('Title is required');
    }
    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');

    const shop = { title, items: [], totalAmount: 0, startDate: moment().format('YYYY-MM-DD HH:mm:ss') };
    const result = await collection
      .insertOne(shop);

    await client.close();
    return res.json({...shop, id: result.insertedId});
  },
  shopHandler: async (req, res) => {

  },
  showHandler: async (req, res) => {

  },
  deleteHandler: async (req, res) => {

  },
  addArticleHandler: async (req, res) => {

  },
};