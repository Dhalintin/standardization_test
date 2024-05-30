const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

function connectToRedis(){
    const client = redis.createClient({
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT
    });

    // Handle connection errors
    client.on('error', (err) => console.error('Redis Client Error', err));

    return client;
}

module.exports = connectToRedis;

