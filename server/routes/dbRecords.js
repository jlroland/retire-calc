const express = require('express');
const expRouter = express.Router();
const dbo = require('../db_conn/connection');
const superagent = require('superagent');
const ObjectId = require('mongodb').ObjectId;
const alphaUrl =`https://www.alphavantage.co/query?function=INFLATION&apikey=${process.env.ALPHA_KEY}`;

expRouter.route('/exists/:user').get(function(req, res) {
  let user = req.params.user;
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('users')
    .findOne({username: user}, function (err, result) {
      if (err) throw err;
      //console.log(`User exists: ${result}`);
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
      //console.log(`User added: ${result}`);
      res.json(result);
    });
});

expRouter.route('/addScenario').post(function(req, res) {
  let newScenario = {
    username: req.body.username,
    currentAge: req.body.currentAge,
    retireAge: req.body.retireAge,
    monthlyContribution: req.body.monthlyAmount,
    employerContribution: req.body.employerAmount,
    assetAllocation: req.body.assets,
    expenseRatio: req.body.expenseRatio,
    inflation: req.body.inflation,
    totalPortfolio: req.body.total,
  };
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('userQueries')
    .insertOne(newScenario, function (err, result) {
      if (err) throw err;
      //console.log(`Scenario added: ${result}`);
      res.json(result);
    });
});

expRouter.route('/updateScenario/:id').post(function(req, res) {
  let queryId = {_id: ObjectId(req.params.id)};
  let updatedScenario = {
    username: req.body.username,
    currentAge: req.body.newCurrentAge,
    retireAge: req.body.newRetireAge,
    monthlyContribution: req.body.newMonthlyAmount,
    employerContribution: req.body.newEmployerAmount,
    assetAllocation: req.body.newAssets,
    expenseRatio: req.body.newExpenseRatio,
    inflation: req.body.inflation,
    totalPortfolio: req.body.newTotal,
  };
  let dbConnect = dbo.getDb('retire_db');
  dbConnect
    .collection('userQueries')
    .replaceOne(queryId, updatedScenario, function (err, result) {
      if (err) throw err;
      //console.log(`Scenario added: ${result}`);
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
      //console.log(result);
      res.json(result);
    });
});

expRouter.route('/inflation').get(function(req, res) {
  superagent.get(alphaUrl)
    .pipe(res);
});

expRouter.route('/delete/:id').delete(function (req,res) {
  let dbConnect = dbo.getDb('retire_db');
  let removeQuery = {_id: ObjectId(req.params.id)};
  console.log(removeQuery);
  dbConnect
    .collection('userQueries')
    .deleteOne(removeQuery, function (err, obj) {
      if (err) throw err;
      console.log('document delete');
      res.json(obj);
    });
});

module.exports = expRouter;
