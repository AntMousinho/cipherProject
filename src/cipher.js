const fs = require('fs');
const os = require('os');

class Cipher {
    constructor(characterSet) {
        this._cipher = this.readCipher(characterSet);
    }
    
    encrypt(string) {
        return string.split('').map(char => {
            return this._cipher[char];
        }).join('');
    }

    decrypt(string) {
        let swappedCipher = this.invertCipher(this._cipher);       
        return string.split('').map(char => {
            return swappedCipher[char];
        }).join('');
    }

    readCipher(file) {
        let data = fs.readFileSync(file, 'utf8');
        let result = {}
        data.split(os.EOL).map(pair => pair.split(', ')).forEach(splitPair => result[splitPair[0]] = splitPair[1])
        return  result;
    }

    invertCipher(obj) {
        const newObj = {};
        Object.keys(obj).forEach(key => newObj[obj[key]] = key);
        return newObj;
    }

}

module.exports = Cipher;
