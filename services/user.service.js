const User = require('../models/user.model');

class UserService {
    // Get User with email
    async getuser(email){
        const user = User.findOne({email});
        return user;
    }
    // Register New User
    async register(email) {
        const newUser = new User({ email });
        return await newUser.save();
    }

    async deleteUser(id){
        const user = User.findOneAndDelete(id);
        return user;
    }
}

module.exports = new UserService();
