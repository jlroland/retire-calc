'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;

const { MongoClient } = require('mongodb');
const dbClient = new MongoClient(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});

/* Function is triggered when user logs in. Retrieves documents for specified user. Results populate table on front end. */
async function userQuery(user) {
  try {
    await dbClient.connect();
    console.log('MongoDB connected to server');
    const db = dbClient.db('retire_db');

    // Get the collection
    const col = db.collection('userQueries');
  
    // Get all documents matching queried user
    const docs = await col.find({username:user}).toArray();
    console.log(docs);
    
    // Close connection
    dbClient.close();
  } catch(err) {
    console.log(err.stack);
  }
}

/* Function retrieves historical monthly values for Vanguard S&P 500 ETF. Triggered by calculator if database is out of date to repopulate with current data. */
function getEquities() {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=VOO&apikey=${process.env.ALPHA_KEY}`;
  return superagent.get(url)
    .then(apiResponse => {
      if(!apiResponse._body) {
        throw 'No Data';
      }
      else {
        return apiResponse._body['Monthly Adjusted Time Series'];
      }
    })
    .catch(error => console.log(error));
}
//getEquities().then((result) => console.log(result));

// app.use(require('./routes/record'));
app.listen(port, () => console.log(`Server is running on port: ${port}`));
