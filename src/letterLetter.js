const invertCipher = require('./invertCipher');
const readCipher = require('./readCipher');

class LetterLetter {
    constructor(characterSet) {
        this._cipher = readCipher(characterSet);
    }
    
    encrypt(string) {
        return string.split('').map(char => {
            return this._cipher[char];
        }).join('');
    }

    decrypt(string) {
        let swappedCipher = invertCipher(this._cipher);       
        return string.split('').map(char => {
            return swappedCipher[char];
        }).join('');
    }
}

module.exports = LetterLetter;
