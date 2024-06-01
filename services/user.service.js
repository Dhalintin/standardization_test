const User = require('../models/user.model');

class UserService {
    // Get User with email
    async getuser(email){
        const user = User.findOne({email});
        return user;
    }
    // Register New User
    async register(username, email, password) {
        const newUser = new User({ email, username, password });
        return await newUser.save();
    }

    async updateVerifiedStatus(user){
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id}, 
            { $set: { isVerified: true} }
        );

        return updatedUser;
    }

    async deleteUser(id){
        const user = User.findOneAndDelete(id);
        return user;
    }
}

module.exports = new UserService();
