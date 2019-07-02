require('dotenv').config();
require('./src/utils/configure');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const server = require('http').Server(app);


app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(require('./routes'));

server.listen(process.env.SERVER_PORT);
console.log(`LISTENING ON PORT ${process.env.SERVER_PORT}`);