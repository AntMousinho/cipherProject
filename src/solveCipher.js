const fs = require('fs');
const LetterNumberCipher = require('./letterNumberCipher');
const LetterLetterCipher = require('./cipher');


const solveCipher = (whatCipher, method, file, characterSet, key = null) => {
    const fileString = fs.readFileSync(file, 'utf8');

    const cipherType = selectCipher(whatCipher, characterSet);
    
    const output = executeMethod(method, cipherType, fileString, key);
    
    let outputFileName = sliceFileName(file);

    fs.writeFile(`${outputFileName}`, output, (err) => {
        if(err) throw err;
    });
}



const sliceFileName = file => {
    let tempFileName = ''
    if(file.slice(file.length - 4) === '.txt') {
        tempFileName = `${file}.enc`;
    } else {
        tempFileName = file.slice(0, file.length - 4);
    }
    let newFileName = tempFileName;
    return newFileName;
}



const selectCipher = (cipherFile, characterSet) => {
    if(cipherFile === 'ln') {
        return new LetterNumberCipher(__dirname + `/../characterSets/${characterSet}`);
    } else {
        return new LetterLetterCipher(__dirname + `/../characterSets/${characterSet}`);
    }
}



const executeMethod = (method, cipherType, fileString, key) => {
    let output = ''
    if(method === 'enc') {
        output = cipherType.encrypt(fileString, parseInt(key));
    } else {
        output = cipherType.decrypt(fileString, parseInt(key));
    }
    return output;
}

module.exports = solveCipher;
