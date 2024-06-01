const UserService = require('../services/user.service');
const OtpService = require('../services/otp.service');
const ApikeyService = require('../services/apikey.service');
const sendMail = require('../utils/sendmail.util')
const generate = require('../utils/generate.util');
const Redis  = require('../services/redis.service');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


class UserController {
    async register(req, res){
        try{
            const { email, username }  = req.body;
            const userPassword  = req.body.password;
            const existingUser = await UserService.getuser(email);
            if(existingUser){
                return res.status(400).json({
                    success: false,
                    message: "This email has already been used by another user"
                })                
            }

            const password = await argon2.hash(userPassword, {
                type: argon2.argon2id,
                saltLength: 16,
                timeCost: 5,
                memoryCost: 2048,
            });
            const newUser = await UserService.register(username, email, password);
            
            if(!newUser){
                return res.status(500).json({
                    success: false,
                    message: "Registration failed!"
                })
            }

            const link = 'https://standardization-test.onrender.com/api/v1/user/login';
            const emailMessage = `<h2>Welcome to Krypton Secure</h2>
            <p>You have successful registered on Krypton Secure. Please proceed to link in on <a href="${link}">${link}</a></p>`;

            try{
                await sendMail(email, emailMessage);
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
            const { email, password } = req.body;
            const user = await UserService.getuser(email);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            const isVerified = await argon2.verify(user.password, password);
            if(!isVerified){
                return res.status(401).json({
                    success: false,
                    message: "Authentications failed"
                });
            }

            const token = jwt.sign({
                email: user.email,
                userId: user._id,
                username: user.username,
            }, process.env.JWT_KEY, {
                expiresIn: "24h",
            });
            
            const otp = generate.generateOTP();
            const emailMessage = `<h3>Please use this OTP to login ${otp}. </h3><h4>Note this token will expire in 5 mins</h4>`

            const userId = user._id;
            await OtpService.storeOtp(otp, userId);
            await sendMail(email, emailMessage);

            return res.status(200).json({
                success: true,
                message: "An OTP has been sent to your email it will expire in 5 minutes. Please use it to log in.",
                token: token
            })
        }catch(error){
            res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async verifyEmail(req, res){
        try{
            const { email, otp } = req.body;
            const existingUser = await UserService.getuser(email);
            const existingOtp = await OtpService.verifyOtp(existingUser._id, otp);
            if(!existingOtp){
                return res.status(401).json({
                    success: false,
                    message: "Wrong or expired OTP"
                })
            }

            if(!existingUser.isVerified){
                //Generate and API key for them
                const apiKey = generate.generateApiKey();

                // Store the API key in the database
                const newApikey = await ApikeyService.storeApiKey(apiKey, existingUser._id);

                // Delete the Otp that has been used
                await OtpService.deleteOtp(existingOtp._id);

                // Update the verified status of the user
                await UserService.updateVerifiedStatus(existingUser);

                // Send the API key to the user in their mail
                const emailMessage = `<h3>Your API key is <a>${apiKey}</a>. Please keep it safe`
                await sendMail(email, emailMessage);


                return res.status(200).json({
                    success: true,
                    message: `Successful! Here's your api key ${apiKey}. Please store it.`,
                    data: newApikey
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "This Email has already been verified and sent and API key. Please use the API or generate another API key for all actions"
                })
            }
        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async generateApiKey(req, res){
        try{
            const { email } = req.body;
            const user = await UserService.getuser(email);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Auth failed!"
                })
            }

            if(user.isVerified){
                //Generate and API key for them
                const apiKey = generate.generateApiKey();

                // Store the API key in the database
                const newApikey = await ApikeyService.storeApiKey(apiKey, user._id);

                // Send the API key to the user in their mail
                const emailMessage = `<h3>Your API key is <a href="">${apiKey}</a>. Please keep it safe`
                await sendMail(email, emailMessage);

                return res.status(200).json({
                    success: true,
                    message: `Successful! Here's your api key ${apiKey}. Please store it.`,
                    data: newApikey
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "Please verify for account first"
                })
            }
        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })

        }
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