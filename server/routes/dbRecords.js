const express = require('express');
const expRouter = express.Router();
const dbo = require('../db/connection');

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
