
class Token{
    generateOTP() {
        const randomNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        return randomNum.toString();
    }
}

module.exports = new Token;