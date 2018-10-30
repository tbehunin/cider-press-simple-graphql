const graphql = require('graphql');
const fetch = require('node-fetch');
const Genre = require('../genres/schema');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const BASE_URL = 'http://localhost:4000/api';

const schema = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        cast: {
            type: new GraphQLList(require('../celebs/schema')),
            resolve: ({ cast = [] }) =>
                fetch(`${BASE_URL}/celebs?celebIds=${cast.join(',')}`)
                    .then(response => response.json()),
        },
        genres: {
            type: new GraphQLList(Genre),
            resolve: ({ genres = [] }) =>
                fetch(`${BASE_URL}/genres?genreIds=${genres.join(',')}`)
                    .then(response => response.json()),
        },
    }),
});
module.exports = schema;
