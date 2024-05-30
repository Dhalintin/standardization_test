const UserService = require('../services/user.service');
const OtpService = require('../services/otp.service');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const sendMail = require('../utils/sendmail.util')
const generateToken = require('../utils/generateotp.util');
const Redis  = require('../services/redis.service');


class UserController {
    async register(req, res){
        try{
            const email  = req.body.email;
            const existingUser = await UserService.getuser(email);
            if(existingUser){
                return res.status(400).json({
                    success: false,
                    message: "This email has already been used by another user"
                })                
            }

            const newUser = await UserService.register(email);
            
            if(!newUser){
                return res.status(500).json({
                    success: false,
                    message: "Registration failed!"
                })
            }

            const link = 'https://memsix.onrender.com/api/v1/user/login';
            const emailMessage = `<h2>Welcome to Krypton Secure</h2>
            <p>You have successful registered on Krypton Secure. Please proceed to link in on <a href="${link}">${link}</a></p>`;

            try{
                const mail = await sendMail(email, emailMessage);
            }catch(error){
                res.staus(401).json({
                    success: false,
                    message: "Mail wasn't sent!"
                })
            }

            
            return res.status(200).json({
                success: true,
                message: `Your registration is complete!
                Check your inbox for instructions on how to get started with Krypton Secure.
                Tip:  If you don't see our email, be sure to check your spam folder and mark it as "not spam" to ensure you receive future updates.`,
                data: newUser
            })

        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async login(req, res){
        try{
            const email = req.body.email;
            const existingUser = await UserService.getuser(email);
            if(!existingUser){
                
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            const otp = generateToken.generateOTP();
            const emailMessage = `<h3>Please use this OTP to login ${otp}. </h3><h4>Note this token will expire in 5 mins</h4>`

            try{
                const userId = existingUser._id;
                await OtpService.storeOtp(otp, userId);

                try{
                    await sendMail(email, emailMessage);
                }catch(error){
                    res.staus(401).json({
                        success: false,
                        message: "Mail wasn't sent!"
                    })
                }
                
            }catch(error){
                return res.status(500).json({
                    success: false,
                    message: error.message
                })
            }

            return res.status(200).json({
                success: true,
                message: "An OTP has been sent to your email it will expire in 5 minutes. Please use it to log in."
            })
        }catch(error){
            res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async verifyEmail(req, res){

    }

    async deleteUser(req, res){
        const email  = req.body.email;
        const existingUser = await UserService.getuser(email);
        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })                
        }

        const id = existingUser._id
        try{
            const user = await UserService.deleteUser(id); 
            return res.status(400).json({
                success: false,
                message: "Deleted Successfully"
            }) 
        }catch(error){
            return res.status(400).json({
                success: false,
                message: "User not deleted"
            })
        }
        

        
    }
}

module.exports = new UserController();