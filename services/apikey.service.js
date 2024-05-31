const Apikey = require('../models/apikey.model');

class ApiKeyService{
    async findApikey(apiKey){
        const newApikey = await Apikey.findOne({ apiKey });
        return newApikey;
    }
    
    async storeApiKey(apiKey, userId){
        const newApikey = new Apikey({ apiKey, userId });
        return await newApikey.save();
    }
}

module.exports = new ApiKeyService;