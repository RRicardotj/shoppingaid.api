const moment = require('moment');
const randomstring = require('randomstring');
const { MongoClient, ObjectID } = require('mongodb');
const uri = `mongodb+srv://shoppingaid:${process.env.DB_PASSWORD}@shoppingaid-lrfu9.mongodb.net/test?retryWrites=true&w=majority`;
const ShopError = require('../utils/ShopError');

const generateId = () => randomstring.generate({ length: 6 }) + moment().format('ssYYmmMMDDHHs') + randomstring.generate({ length: 9 });

module.exports = {
  createHandler: async (req, res) => {
    const idItem = generateId();
    const { shopId, name, price, quantity, assessment } = req.body;

    if (!shopId || !name || !price || !quantity || !assessment) {
      let message = `${!shopId ? 'shopId es requerido. ' : ''}`;
      message += `${!name ? 'El nombre es requerido. ' : ''}`;
      message += `${!price ? 'El precio es requerido. ' : ''}`;
      message += `${!quantity ? 'La cantidad es requerida. ' : ''}`;
      message += `${!assessment ? 'El gravamen es requerido. ' : ''}`;

      throw new ShopError(message);
    }

    const client = new MongoClient(uri, { useNewUrlParser: true });

    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');

    const shop = await collection.findOne({ _id: new ObjectID(shopId) });
    
    if (!shop) {
      throw new ShopError('La compra no fué encontrada');
    }

    let { articles } = shop;
    if (!articles) { articles = []; }
    articles.push({ idItem, name, price, quantity, assessment });
    await collection.updateOne({ _id: new ObjectID(shopId) }, { $set: { articles } });
    
    return res.json({ articles });
  },
  updateHandler: async (req, res) => {
    const { shopId, name, price, quantity, assessment } = req.body;
    const { id } = req.params;

    if (!shopId || !name || !price || !quantity || !assessment) {
      let message = `${!shopId ? 'shopId es requerido. ' : ''}`;
      message += `${!name ? 'El nombre es requerido. ' : ''}`;
      message += `${!price ? 'El precio es requerido. ' : ''}`;
      message += `${!quantity ? 'La cantidad es requerida. ' : ''}`;
      message += `${!assessment ? 'El gravamen es requerido. ' : ''}`;

      throw new ShopError(message);
    }

    const client = new MongoClient(uri, { useNewUrlParser: true });

    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');
    console.log(shopId);

    const shop = await collection.findOne({ _id: new ObjectID(shopId) });
    
    if (!shop) {
      throw new ShopError('La compra no fué encontrada');
    }
    let { articles } = shop;
    if (!articles || articles.length === 0) { throw new ShopError('La compra no tiene artículos'); }

    articles = articles.map((item) => {
      if (item.idItem === id) {
        const itemUpdated = {...item, name, price, quantity, assessment};
        return itemUpdated;
      }
      return item;
    });

    await collection.updateOne({ _id: new ObjectID(shopId) }, { $set: { articles } });
    
    return res.json({ articles });
  },
  removeHandler: async (req, res) => {
    const { shopId } = req.body;
    const { id } = req.params;

    if (!shopId) {
      throw new ShopError('shopId es requerido.');
    }

    const client = new MongoClient(uri, { useNewUrlParser: true });

    await client.connect();

    const collection = await client.db('shoppingaid').collection('shops');
    console.log(shopId);

    const shop = await collection.findOne({ _id: new ObjectID(shopId) });
    
    if (!shop) {
      throw new ShopError('La compra no fué encontrada');
    }
    let { articles } = shop;
    if (!articles || articles.length === 0) { throw new ShopError('La compra no tiene artículos'); }
    articles = articles.filter((item) => (item.idItem !== id));

    await collection.updateOne({ _id: new ObjectID(shopId) }, { $set: { articles } });
    
    return res.json({ articles });
  },
};
