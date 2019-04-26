const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config'); 

const app = express();

//connect to mlab db
mongoose.connect(MONGODB_URL);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server is now listening for requests on port 4000');
});
