import Joi from "joi";

export const shcemaIReveiew = Joi.object({
    movieId: Joi.string().optional(),
    rating: Joi.number(),
    text: Joi.string().required(),
});