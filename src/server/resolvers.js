const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:4000/api';

const resolvers = {
    hello: () => 'hello world!',
    movies: (obj, args, context, info) => {
        // console.log('******** obj ********', obj);
        // console.log('******** args ********', args);
        // console.log('******** context ********', context);
        // console.log('******** info ********', info);
        return fetch(`${BASE_URL}/movies/1`)
            .then(response => response.json())
            .then(json => {
                console.log('json', json);
                return [json];
            })
    }

};

module.exports = resolvers;
