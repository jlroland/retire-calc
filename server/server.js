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

// app.use(require('./routes/record'));
app.listen(port, () => console.log(`Server is running on port: ${port}`));
