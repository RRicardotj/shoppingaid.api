const moment = require('moment');
const { MongoClient, ObjectID } = require('mongodb');
const uri = `mongodb+srv://shoppingaid:${process.env.DB_PASSWORD}@shoppingaid-lrfu9.mongodb.net/test?retryWrites=true&w=majority`;
const ShopError = require('../utils/ShopError');

module.exports = {
  createHandler: async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    const { title } = req.body;

    if (!title) {
      throw new ShopError('El título es requerido');
    }
    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');

    const shop = {
      userId: 1,
      title,
      articles: [],
      total: 0,
      iva: 16,
      startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      currency: 'USD'
    };
    await collection
      .insertOne(shop);

    await client.close();
    return res.json(shop);
  },
  listShopHandler: async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');

    const shops = await collection.find({ userId: Number(process.env.STATIC_USERID) }).project({ title: 1, items: 1, total: 1, startDate: 1, endDate: 1 }).toArray();

    await client.close();
    return res.json(shops);
  },
  showHandler: async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    const { id } = req.params;

    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');

    const shop = await collection.findOne({ _id: new ObjectID(id) });
    
    if (!shop) {
      throw new ShopError('La compra no fué encontrada');
    }

    await client.close();
    return res.json(shop);
  },
  deleteHandler: async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    const { id } = req.params;

    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');

    const shop = await collection.findOne({ _id: new ObjectID(id) });
    
    if (!shop) {
      throw new ShopError('La compra no fué encontrada');
    }

    await collection.deleteOne({ _id: new ObjectID(id) });

    await client.close();
    return res.json({ id });
  },
  addArticleHandler: async (req, res) => {

  },
  updateArticleHandler: async (req, res) => {
    // move to articles folder
  },
  deleteArticleHandler: async (req, res) => {
    // move to articles folder
  },
};