var mongoose = require('mongoose');

//Schema for a spotify artist
var NXTCode = mongoose.Schema({
  address: String,
  code: Array, //Should be an array of objects
});

module.exports = mongoose.model('NXTCode', NXTCode);
