'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/dbRecords'));

const dbo = require('./db/connection');
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});


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


