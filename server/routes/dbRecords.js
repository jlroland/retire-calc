const express = require('express');
const expRouter = express.Router();
const dbo = require('../db_conn/connection');

expRouter.route('/exists/:user').get(function(req, res) {
  let user = req.params.user;
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('users')
    .findOne({username: user}, function (err, result) {
      if (err) throw err;
      console.log(`User exists: ${result}`);
      res.json(result);
    });
});

expRouter.route('/addUser').post(function(req, res) {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('users')
    .insertOne(newUser, function (err, result) {
      if (err) throw err;
      console.log(`User added: ${result}`);
      res.json(result);
    });
});

/* Route is triggered when user logs in. Retrieves documents for specified user. Results populate table on front end. */
expRouter.route('/queries/:user').get(function(req, res) {
  let user = req.params.user;
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('userQueries')
    .find({username: user})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
});

module.exports = expRouter;
