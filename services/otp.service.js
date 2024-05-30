const Otp = require('../models/otp.model');

class OtpService {
    async storeOtp(otp, userId){
        const newOtp = new Otp({ otp, userId})

        return await newOtp.save();
    }

    async verifyOtp(userId, otp){
        const existingOtp = Otp.findOne({ otp, userId })
        return existingOtp
    }

    async deleteOtp(id){
        const existingOtp = Otp.findOneAndDelete(id);
        return existingOtp
    }
}

module.exports = new OtpService;