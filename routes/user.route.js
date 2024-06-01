const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const registerValidation = require('../middlewares/register.middleware');
const loginValidation = require('../middlewares/login.middleware');
const otpValidation = require('../middlewares/otp.middleware');
const checkAuth = require('../middlewares/user.auth');


router.post('/register', registerValidation, controller.register);

router.post('/login', loginValidation, controller.login);

// Verify mail and automatic Apikey Generation
router.post('/verify-email', otpValidation, controller.verifyEmail);

// Create new API
router.post('/apikey-gen', checkAuth, controller.generateApiKey);

router.delete('/delete', controller.deleteUser);


module.exports = router;