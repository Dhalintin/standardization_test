const Joi = require('joi');

const otpValidation = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().pattern(/^[0-9]{6}$/).required(),
});

module.exports = {otpValidation};
