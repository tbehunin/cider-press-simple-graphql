const express = require('express');
const graphqlHTTP = require('express-graphql');
const data = require('./dataIndexer');
const movieRoutes = require('./movieRoutes');
const celebRoutes = require('./celebRoutes');
const genreRoutes = require('./genreRoutes');
const bodyParser = require('body-parser');


const app = express();
app.set('movies', data.movies);
app.set('celebs', data.celebs);
app.set('genres', data.genres);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/movies', movieRoutes);
app.use('/api/celebs', celebRoutes);
app.use('/api/genres', genreRoutes);
app.use('/graphql', graphqlHTTP({
  schema: {},
  graphiql: true
}));

app.listen(4000);
