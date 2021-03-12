# CipherProject README
cipherProject is a JavaScript library used to encode and decode .txt files.


# Directory structure
- The directory is sorted into three directories: src, text_files, and output_files.
    - src - where the source code is stored to run the programme
    - text_files - 4 experiment text files that are to be encrypted or decrypted (the testing zone)
    - output_files - where the newly created encrypted or decrypted .txt files are located


# How to install the program
- Make sure you have Node.Js installed
- Git clone the repository to your device from:
git@github.com:AntMousinho/challenge10.git


# How to run code
- Navigate to the project directory through the command line (challenge10)
- The command will take 3 or 4 arguments outlined below
- input :
```
$ node src/main [cipher] [method] [file] [key]
```

-`src/main` will remain constant when encrypting/decrypting files. The source file that executes the program

-`cipher` - either `ll` (letterLetter) or `ln` (letterNumber) cipher, depending on what you are trying to encrypt/decrypt

-`method` - either `enc` (encrypt) or `dec` (decrypt)

-`file` - the filepath for the .txt file that needs encypting/decrypting

-`key` - Optional. Used for letterNumber ciphers

- This will create a new file for with the encrypted/decrypted output and store it in the `output_files` directory
- See example outputs for further details


# Expected outputs

* Example 1: Encrypt `testLNEnc.txt` with key `31045` - LetterNumber Cipher
input code: 
```
$ node src/main ln enc text_files/testLNEnc.txt 31045
```

expected output: A new text file called `testLNEnc.txt.enc` in `output_files` directory containing:
 `97747470597481647759796764776413`




* Example 2: Decrypt `testLNDec.txt.enc` with key 4771 - LetterNumber Cipher
input code:
```
$ node src/main ln dec text_files/testLNDec.txt.enc 4771
```

expected output: A new text file called `testLNDec.txt` in `output_files` directory containing:
`Hi, Ed! I think someone's on to this cipher!`




* Example 3: Encrypt `testLLEnc.txt` - LetterLetter Cipher
input code: 
```
$ node src/main ll enc text_files/testLLEnc.txt
```

expected output: A new text  file called `testLLEnc.txt.enc` in `output_files` directory containing:
`B!!ym!9DAm2§DAD `




* Example 4: Decrypt `testLLDec.txt.enc` - LetterLetter Cipher
input code: 
```
$ node src/main ll dec text_files/testLLDec.txt.enc
```

expected output: A new text file called `testLLDec.txt` in `output_files` directory containing:
`Quick! We need a distraction! Once you read this message, find the community channel named "random" on Discord, and share a random fact regarding any insect - but it has to be about insects! Fingers crossed this will distract and slow down the people cracking these ciphers!`




# Approach to getting to this point
- As the letterLetter Cipher and letterNumber cipher had previously been made, I started by recreating those classes.
    - Split them into their own files and reworked them to make them more streamline, easier to read and efficient
    - `invertCipher.js` and `readCipher.js` were two methods that I extracted into their own files. They are used in both types of ciphers
        - In future work, maybe create a `Cipher` parent class that contains invertCipher and readCipher, and have `LetterLetter` and `LetterNumber` and child classes.

- Majority of work on `solveCipher.js`. Needed to create a method that would choose the appropriate cipher and appropriate method depending on the input.
    - Started as one long method that i wrote until it was able to run as expected
    - Then i refacactored the file into multiple methods that were called by the `solveCipher` method

- Throughout the project, using console.log to check each method and file and debug as I worked through the task
    - e.g. checking that `letterNumber.js` ran as expected before moving on to `letterLetter.js` and so on
    - This way, when working on `solveCipher.js` I could trust the output of each method would be what was intended

- After `solveCipher.js` was workign and creating new text files. Moved onto `main.js`
    - Needed this to read the console input and execute `solveCipher()`
    - Researched and experimented with `process.argv` to save the input as an array to be used as `solveCipher()` arguments

- Main problems encountered with file sources, what is the best way to input a file source to the console / input it in your code?
    - e.g.
    ```
    return new LetterNumber('src/character_set.txt')
    ```
    -This file source will work for this directory, but will it cause problems if the directory is moved/ when the repository is cloned to a different device.
