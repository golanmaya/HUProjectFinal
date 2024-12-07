const Joi = require('joi');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
}

const schemas = {
    createMovieCard: Joi.object()
        .keys({
            title: Joi.string().required(),
            summary: Joi.string().required(),
            genre: Joi.string().required(),
            releaseYear: Joi.number().required(),
            director: Joi.string().required(),
            image: Joi.object().keys({
                url: Joi.string().uri().required(),
                alt: Joi.string().optional(),
            }).required(),
        })
        .options(validationOptions),

    // Optional extension for updating a movie card
    updateMovieCard: Joi.object()
        .keys({
            title: Joi.string().optional(),
            summary: Joi.string().optional(),
            genre: Joi.string().optional(),
            releaseYear: Joi.number().optional(),
            director: Joi.string().optional(),
            image: Joi.object().keys({
                url: Joi.string().uri().optional(),
                alt: Joi.string().optional(),
            }).optional(),
        })
        .options(validationOptions)
        .min(1)
        .message("The request's body must include at least one valid key"),


}

module.exports = schemas;