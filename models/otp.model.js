const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

OtpSchema.pre('save', async function (next) {
    const now = Date.now();
    if (now - this.createdAt > 5 * 60 * 1000) {
      this.invalidate('Expired OTP');
    }
    next();
});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = Otp;