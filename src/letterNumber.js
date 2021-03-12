const Cipher = require('./cipher');

class LetterNumber extends Cipher{
    constructor(characterSet) {
        super(characterSet);
    }
    
    encrypt(string, offset) {
        return string.split('').map(char => {    
            let number = (parseInt(this._cipher[char]) + offset) % 99            
            return number.toString().padStart(2, '0')
        }).join('');
    }

    decrypt(string, offset) {
        let invertedCipher = super.invertCipher(this._cipher);
        return this.chunk(string.split(''), 2).map(pair => {
            let cipherPair = parseInt(pair.join(''));
            while(cipherPair < offset) {
                cipherPair += 99;
            }
            cipherPair -= offset;
            return invertedCipher[cipherPair.toString()]
        }).join('');
    }

    chunk(array, chunk_size) {
        let chunks = [];
        while(array.length) {
            chunks.push(array.splice(0, chunk_size));
        }
        return chunks;
    }
}

module.exports = LetterNumber;
