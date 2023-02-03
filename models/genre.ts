import Joi from 'joi';
export function validateGenre(genre: genre) {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(4).required()
    });
    const { error } = schema.validate(genre);
    return error;
}

export function findGenre(genre: genre, genres: genre[]) {
    return genres.find(g => g.name === genre.name);
}