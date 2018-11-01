const express = require('express');
var cors = require('cors');
const graphqlHTTP = require('express-graphql');
const morgan = require('morgan');
const data = require('./db/dataIndexer');
const movieRoutes = require('./movies/routes');
const celebRoutes = require('./celebs/routes');
const genreRoutes = require('./genres/routes');
const bodyParser = require('body-parser');
const schema = require('./schema');

const app = express();
app.set('movies', data.movies);
app.set('celebs', data.celebs);
app.set('genres', data.genres);

app.use(morgan('tiny')); // for logging
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/movies', movieRoutes);
app.use('/api/celebs', celebRoutes);
app.use('/api/genres', genreRoutes);
app.use('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);
