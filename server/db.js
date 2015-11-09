var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blarg');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
  console.log('connected.');
});

module.exports = db;
