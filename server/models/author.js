const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', schema);