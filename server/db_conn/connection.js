const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db('retire_db');
        console.log('Connected to MongoDB');
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};