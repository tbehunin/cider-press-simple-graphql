const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const movies = req.app.get('movies');
    const year = req.query.year && parseInt(req.query.year, 10);
    const title = req.query.title;
    const movieIds = (req.query.movieIds || '')
        .split(',')
        .filter(item => item !== '')
        .map(id => parseInt(id));
    res.send(movies.filter(item =>
        (!year || item.year === year) &&
        (!title || item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) &&
        (movieIds.length === 0 || movieIds.find(id => id === item.id))
    ));
});

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const movie = req.app.get('movies').find(item => item.id === id);
    res.send(movie);
});

router.post('/', function (req, res) {
    const movies = req.app.get('movies');
    const id = movies[movies.length - 1].id + 1;
    movies.push({ ...req.body, id });
    res.send({ id });
});

router.put('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const movies = req.app.get('movies');
    const movie = movies.find(item => item.id === id);
    if (movie) {
        movie.title = req.body.title;
        movie.year = req.body.year;
        movie.cast = req.body.cast;
        movie.genres = req.body.genres;
    }
    res.end();
});

router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const movies = req.app.get('movies');
    const index = movies.findIndex(item => item.id === id);
    if (index !== -1) {
        movies.splice(index, 1);
    }
    req.app.set('movies', movies);
    res.end();
});

module.exports = router;