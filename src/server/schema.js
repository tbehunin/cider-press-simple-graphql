const graphql = require('graphql');
const fetch = require('node-fetch');
const Movie = require('./movies/schema');
const Celeb = require('./celebs/schema');
const Genre = require('./genres/schema');
const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLString } = graphql;

const BASE_URL = 'http://localhost:4000/api';

const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        movies: {
            type: new GraphQLList(Movie),
            args: {
                year: { type: GraphQLInt },
                title: { type: GraphQLString },
            },
            resolve: (_, { year, title }) => {
                const params = { year, title };
                const qs = Object.entries(params)
                    .map(arr => arr[1] ? `${arr[0]}=${arr[1]}` : null)
                    .filter(item => item)
                    .join('&');
                return fetch(`${BASE_URL}/movies/?${qs}`)
                    .then(response => response.json());
            },
        },
        movie: {
            type: Movie,
            args: { id: { type: GraphQLInt } },
            resolve: (_, args) =>
                fetch(`${BASE_URL}/movies/${args.id}`)
                    .then(response => response.json())
        },
        celebs: {
            type: new GraphQLList(Celeb),
            args: {
                name: { type: GraphQLString },
            },
            resolve: (_, { name }) => {
                const params = { name };
                const qs = Object.entries(params)
                    .map(arr => arr[1] ? `${arr[0]}=${arr[1]}` : null)
                    .filter(item => item)
                    .join('&');
                return fetch(`${BASE_URL}/celebs/?${qs}`)
                    .then(response => response.json());
            },
        },
        celeb: {
            type: Celeb,
            args: { id: { type: GraphQLInt } },
            resolve: (_, args) =>
                fetch(`${BASE_URL}/celebs/${args.id}`)
                    .then(response => response.json())
        },
        genres: {
            type: new GraphQLList(Genre),
            args: {
                name: { type: GraphQLString },
            },
            resolve: (_, { name }) => {
                const params = { name };
                const qs = Object.entries(params)
                    .map(arr => arr[1] ? `${arr[0]}=${arr[1]}` : null)
                    .filter(item => item)
                    .join('&');
                return fetch(`${BASE_URL}/genres/?${qs}`)
                    .then(response => response.json());
            },
        },
        genre: {
            type: Genre,
            args: { id: { type: GraphQLInt } },
            resolve: (_, args) =>
                fetch(`${BASE_URL}/genre/${args.id}`)
                    .then(response => response.json())
        },
    }),
});

const schema = new GraphQLSchema({ query });

module.exports = schema;
