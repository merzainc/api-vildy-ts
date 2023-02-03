import { Router } from "express";
import * as Joi from 'joi';
import { findGenre, validateGenre } from '../models/genre';

const router = Router();
/** genres source */
const genres: genre[] = [{ id: 1, name: 'Action' }];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('No genre was found with given ID');
    res.send(genre);
});

router.post('/', (req, res) => {
    const genre = { id: genres.length + 1, name: req.body.name };
    const error = validateGenre(genre);
    if (error) return res.status(400).send(error.details[0].message);
    if (findGenre(genre, genres)) return res.status(400).send('Can\'t create genre, it already exists.');
    genres.push(genre); res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('No genre was found with given ID');
    genre.name = req.body.name;
    const error = validateGenre(genre);
    if (error) return res.status(400).send(error.details[0].message);
    if (findGenre(genre, genres)) return res.status(400).send('Can\'t update genre, there exist another one.');
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    genres.splice(genres.indexOf(genre), 1);
    res.send(genre);
});
export default router;