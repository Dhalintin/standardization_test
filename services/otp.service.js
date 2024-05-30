const Otp = require('../models/otp.model');

class OtpService {
    async storeOtp(otp, userId){
        const newOtp = new Otp({ otp, userId})

        return await newOtp.save();
    }
}

module.exports = new OtpService;