import Joi from "joi";

export const shcemaIMovieCreate = Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().required(),
    summary: Joi.string().required(),
    genre: Joi.string().required(),
    releaseYear: Joi.number().required(),
    director: Joi.string().required(),
    image: Joi.object({
        url: Joi.string().uri().required().min(14),
        alt: Joi.string().optional(),
    }).required(),
});
