const mongoose = require('mongoose');

const { MONGODB_URL } = require('../config');

const Author = require('../models/author');
const Book = require('../models/book');

// Seed Data
const authors = [
  { _id: '011111111111111111111100', name: 'Patrick Rothfuss', age: 44 },
  { _id: '011111111111111111111101', name: 'Brandon Sanderson', age: 42 },
  { _id: '011111111111111111111102', name: 'Terry Pratchett', age: 66 }
];

const books = [
  { _id: '111111111111111111111100', name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '011111111111111111111100' },
  { _id: '111111111111111111111101', name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '011111111111111111111101' },
  { _id: '111111111111111111111102', name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '011111111111111111111101' },
  { _id: '111111111111111111111103', name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '011111111111111111111102' },
  { _id: '111111111111111111111104', name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '011111111111111111111102' },
  { _id: '111111111111111111111105', name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '011111111111111111111102' },
];

console.log(`connecting to mongodb at ${MONGODB_URL}`);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info('Delete Data');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      Author.insertMany(authors),
      Book.insertMany(books)
    ]);
  })
  .then(results => {
    console.log('inserted', results);
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });