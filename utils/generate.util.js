
class Token{
    generateOTP() {
        const randomNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        return randomNum.toString();
    }

    generateApiKey(length = 32) {
        const characterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let apiKey = "";

        // Use Math.random for a simpler approach
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            apiKey += characterPool.charAt(randomIndex);
        }
        return apiKey
    }
}

module.exports = new Token;