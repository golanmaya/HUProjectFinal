const Joi = require('joi');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
}

const schemas = {
    newReview: Joi.object()
        .keys({
            rating: Joi.number().min(0).max(10).required(),
            text: Joi.string().required(),
        })
        .options(validationOptions).required(),
    patchReview: Joi.object().keys(
        {
            rating: Joi.number().min(0).max(10).optional(),
            text: Joi.string().optional(),
        }
    ).options(validationOptions).required(),
}

module.exports = schemas;