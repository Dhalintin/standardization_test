const Apikey = require('../models/apikey.model');

class ApiKeyService{
    async storeApiKey(apiKey, userId){
        const newApikey = new Apikey({ apiKey, userId });
        return await newApikey.save();
    }
}

module.exports = new ApiKeyService;