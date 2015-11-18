var mongoose = require('mongoose');

mongoURI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/blarg';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
  console.log('connected.');
});

module.exports = db;
