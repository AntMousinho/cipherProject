const fs = require('fs');
const os = require('os');

const readCipher = (file) => {
    let data = fs.readFileSync(file, 'utf8');
    let result = {}
    data.split(os.EOL).map(pair => pair.split(', ')).forEach(splitPair => result[splitPair[0]] = splitPair[1])
    return  result;
}

module.exports = readCipher;
