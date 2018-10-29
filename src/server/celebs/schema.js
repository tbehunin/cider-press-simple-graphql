const graphql = require('graphql');
const fetch = require('node-fetch');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const BASE_URL = 'http://localhost:4000/api';

const schema = new GraphQLObjectType({
    name: 'Celeb',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        movies: {
            type: new GraphQLList(require('../movies/schema')),
            args: {
                year: { type: GraphQLInt },
                title: { type: GraphQLString },
            },
            resolve: (celeb, { year, title }) =>
                fetch(`${BASE_URL}/movies?movieIds=${celeb.movies.join(',')}&year=${year || ''}&title=${title || ''}`)
                    .then(response => response.json()),
        },
    }),
});
module.exports = schema;
