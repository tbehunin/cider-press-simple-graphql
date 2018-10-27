const graphql = require('graphql');
const Movie = require('../movies/schema');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const BASE_URL = 'http://localhost:4000/api';

const schema = new GraphQLObjectType({
    name: 'Genre',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        // movies: {
        //     type: new GraphQLList(Movie),
        //     args: {
        //         year: { type: GraphQLInt },
        //         title: { type: GraphQLString },
        //     },
        //     resolve: (_, { year, title }) => {
        //         const params = { year, title };
        //         const qs = Object.entries(params)
        //             .map(arr => arr[1] ? `${arr[0]}=${arr[1]}` : null)
        //             .filter(item => item)
        //             .join('&');
        //         return fetch(`${BASE_URL}/movies/?${qs}`)
        //             .then(response => response.json());
        //     },
        // },
    },
});
module.exports = schema;
