#!/usr/bin/env node

const solveCipher = require('../src/solveCipher');
const argv = require('yargs')(process.argv.slice(2))
    .command('$0 <characterSet> <cipher> <method> <inputFile> [key]', 'execute the solveCipher function', (yargs) => {
        yargs.positional('characterSet', {
            describe: 'Character Set for cipher origin',
            type: 'string'
        }).positional('cipher', {
            describe: 'Select which cipher to use (e.g. letterLetter or LetterNumber)',
            type: 'string',
            choices: ['letterNumber', 'ln', 'letterLetter', 'll']
        }).positional('method', {
            describe: 'Which cipher method to use (e.g. encrypt or decrypt)',
            type: 'string',
            choices: ['encrypt', 'enc', 'decrypt', 'dec']
        }).positional('inputFile', {
            describe: 'Text file you want to be encrypted or decrypted',
            type: 'string'
        }).option('key', {
            describe: 'Offset key for letterNumber ciphers',
            type: 'number',
            default: 0,
        }).example([
            ['$ cipherWorld character_set2.txt ll dec testFile.txt.enc',
            'Uses the "character_set2.txt" character set, calls the decrypt method of the LetterLett cipher to decrypt the testFile.txt.enc file'],
            ['$ cipherWorld character_set.txt ln enc testFile.txt 350', 
            'Uses the "character_set.txt" character set, calls the encrypt method of the LetterNumber cipher, with an offset of 350, to encrypt the testFile.txt file']
        ])
    }, (yargs) => {
        solveCipher(yargs.cipher, yargs.method, yargs.inputFile, yargs.characterSet, yargs.key);
    })
    .help('help', 'For further information on this package, including examples, see here: https://www.npmjs.com/package/cipherworld-antony-mse-2103-a')
    .argv;
