'use strict';

const express = require('express');
const cors = require('cors');
//const dbo = require('mongodb');
const app = express();
app.use(cors());
// app.use(express.json());
// app.use(require('./routes/record'));
// const dbo = require('./db/conn');

require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
//   dbo.connectToServer(function(err) {
//     if (err) console.error(err);
//   });
  console.log(`Server is running on port: ${port}`);
});
