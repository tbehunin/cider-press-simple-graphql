const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const celebs = req.app.get('celebs');
    const name = req.query.name;
    const celebIds = (req.query.celebIds || '')
        .split(',')
        .filter(item => item !== '')
        .map(id => parseInt(id));
    console.log('todd', celebIds);
    res.send(celebs.filter(item =>
        (!name || item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) &&
        (celebIds.length === 0 || celebIds.find(id => id === item.id))
    ));
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