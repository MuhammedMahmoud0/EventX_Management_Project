const Joi = require("joi");

exports.eventSchema = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    venue: Joi.string().required(),
    time: Joi.string().required(),
    description: Joi.string(),
    ticketPrice: Joi.number().positive().required(),
    totalSeats: Joi.number().positive().required(),
    tags: Joi.array().items(Joi.string()),
    popularity: Joi.string(),
});
