const Joi = require("joi");

exports.eventSchema = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    venue: Joi.string().required(),
    time: Joi.string()
        .required()
        .pattern(/^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/),
    timeEnd: Joi.string()
        .required()
        .pattern(/^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/),
    description: Joi.string(),
    ticketPrice: Joi.number().positive().required(),
    totalSeats: Joi.number().positive().required(),
    tags: Joi.array().items(Joi.string()),
    popularity: Joi.string().valid("low", "medium", "high"),
    status: Joi.string().valid("upcoming", "pending", "closed"),
});
