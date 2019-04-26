const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

module.exports = mongoose.model('Book', schema);