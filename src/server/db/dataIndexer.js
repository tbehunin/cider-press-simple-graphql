const data = require('./data.json');

console.log('Starting indexing...');

const celebsHash = {};
const genresHash = {};
const movies = data.map((movieItem, movieId) => {
    const movie = {
        id: movieId,
        title: movieItem.title,
        year: movieItem.year,
        cast: [],
        genres: [],
    };
    movieItem.cast.forEach(celeb => {
        if (celebsHash[celeb]) {
            movie.cast.push(celebsHash[celeb].id);
        } else {
            const id = Object.keys(celebsHash).length;
            movie.cast.push(id);
            celebsHash[celeb] = { id, name: celeb, movies: [] };
        }
        celebsHash[celeb].movies.push(movieId);
    });
    movieItem.genres.forEach(genre => {
        if (genresHash[genre]) {
            movie.genres.push(genresHash[genre].id);
        } else {
            const id = Object.keys(genresHash).length;
            genresHash[genre] = { id, name: genre, movies: [] };
        }
        genresHash[genre].movies.push(movieId);
    });
    return movie;
});

const celebs = Object.keys(celebsHash).map(key => celebsHash[key]);
const genres = Object.keys(genresHash).map(key => genresHash[key]);

console.log('Finished indexing!');

module.exports = { movies, celebs, genres };
