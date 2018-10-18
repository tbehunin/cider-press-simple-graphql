const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const celebs = req.app.get('celebs');
    res.send(celebs);
});

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const celeb = req.app.get('celebs').find(item => item.id === id);
    res.send(celeb);
});

router.post('/', function (req, res) {
    const celebs = req.app.get('celebs');
    const id = celebs[celebs.length - 1].id + 1;
    celebs.push({ ...req.body, id });
    res.send({ id });
});

router.put('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const celebs = req.app.get('celebs');
    const celeb = celebs.find(item => item.id === id);
    if (celeb) {
        celeb.name = req.body.name;
        celeb.movies = req.body.movies;
    }
    res.end();
});

router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const celebs = req.app.get('celebs');
    const index = celebs.findIndex(item => item.id === id);
    if (index !== -1) {
        celebs.splice(index, 1);
    }
    req.app.set('celebs', celebs);
    res.end();
});

module.exports = router;