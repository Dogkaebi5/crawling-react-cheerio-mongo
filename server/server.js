const express = require('express');
const app = express();
const port = 8080;
const Schema = require('./mongodb');

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.set('Content-type', 'text/json');
  const getData = async() => await Schema.findAll();
  getData().then( data => res.json({data}))
})