'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
const expRouter = express.Router();
app.use(cors());
app.use(express.json());
app.use('/', expRouter);

require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;
const dbo = require('./db/connection');

expRouter.route('/queries/:user').get(function(req, res) {
  let user = req.params.user;
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('userQueries')
    .find({username: user})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/* Function is triggered when user logs in. Retrieves documents for specified user. Results populate table on front end. */
// function userQuery(req, res) {
//   dbClient.connect(err => {
//     console.log('MongoDB connected to server');
//     const collection = dbClient.db('retire_db').collection('userQueries');
//     const docs = collection.find({username: 'jsmith'}).toArray();
//     console.log(docs);
//     res.json(docs);
//     dbClient.close();
//   });
// }

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

