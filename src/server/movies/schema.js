const graphql = require('graphql');
const fetch = require('node-fetch');
const Celeb = require('../celebs/schema');
const Genre = require('../genres/schema');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const BASE_URL = 'http://localhost:4000/api';

const schema = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        cast: {
            type: new GraphQLList(Celeb),
            resolve: ({ cast }) =>
                cast.map(celebId =>
                    fetch(`${BASE_URL}/celebs/${celebId}`)
                        .then(response => response.json())
                ),
        },
        genres: {
            type: new GraphQLList(Genre),
            resolve: ({ genres }) =>
                genres.map(genreId =>
                    fetch(`${BASE_URL}/genres/${genreId}`)
                        .then(response => response.json())
                ),
        },
    },
});
module.exports = schema;
