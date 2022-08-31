'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;

const { MongoClient } = require('mongodb');
const dbClient = new MongoClient(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// app.use(require('./routes/record'));

app.listen(port, () => {
  dbClient.connect(err => {
    const collection = dbClient.db('sample_mflix').collection('movies');
    if (collection) {
      console.log('Successfully connected to MongoDB');
    }
    dbClient.close();
  });
  console.log(`Server is running on port: ${port}`);
});
