const redis = require('redis');
const dotenv = require('dotenv');
const { createClient } = require('redis') ;

dotenv.config();

class RedisService {
    // Connect to Redis
    async connect(){
        const client = redis.createClient({
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: process.env.REDIS_PORT
        });

        // Handle connection errors
        client.on('error', (err) => {
            return res.status(401).json({
                success: false,
                message: `Connection failed: ${err}`
            })
        });

        return client;
    }

    // Register New User
    async set(client, userId, otp) {
        const now = new Date();
        const expiryTime = now.getTime() + 5 * 60 * 1000;
        const otpStorage = client.set(userId, otp, 'EX', expiryTime);
        return otpStorage;
    }
}

module.exports = new RedisService();
