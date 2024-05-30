const Joi = require('joi');

const userSchemaValidation = Joi.object({
    email: Joi.string().email().required()
});

module.exports = {userSchemaValidation};
