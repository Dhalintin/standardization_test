const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const userEmailValidation = require('../middlewares/email.middleware');
const otpValidation = require('../middlewares/otp.middleware');


router.post('/register', userEmailValidation, controller.register);

router.post('/login', userEmailValidation, controller.login);

router.post('/verify-email', otpValidation, controller.verifyEmail);

router.delete('/delete', controller.deleteUser);


module.exports = router;