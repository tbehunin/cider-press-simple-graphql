const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const genres = req.app.get('genres');
    const name = req.query.name;
    res.send(genres.filter(item => (!name || item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)));
});

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const genre = req.app.get('genres').find(item => item.id === id);
    res.send(genre);
});

router.post('/', function (req, res) {
    const genres = req.app.get('genres');
    const id = genres[genres.length - 1].id + 1;
    genres.push({ ...req.body, id });
    res.send({ id });
});

router.put('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const genres = req.app.get('genres');
    const genre = genres.find(item => item.id === id);
    if (genre) {
        genre.name = req.body.name;
        genre.movies = req.body.movies;
    }
    res.end();
});

router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const genres = req.app.get('genres');
    const index = genres.findIndex(item => item.id === id);
    if (index !== -1) {
        genres.splice(index, 1);
    }
    req.app.set('genres', genres);
    res.end();
});

module.exports = router;