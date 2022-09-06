'use strict';

const express = require('express');
const app = express();
//const path = require('path');
const cors = require('cors');
//const superagent = require('superagent');
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.use(express.json());
app.use(require('./routes/dbRecords'));

const dbo = require('./db_conn/connection');
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});


/* Function retrieves historical monthly values for Vanguard S&P 500 ETF. Triggered by calculator if database is out of date to repopulate with current data. */

//getEquities().then((result) => console.log(result));


