# cipherworld-antony-mse-2103-a README
cipherworld-antony-mse-2103-a is a JavaScript library used to encode and decode .txt files.

# How to install the program
- With the command line, navigate to the directory containing the text files that you want to encrypt or decrypt. Enter:
```
$ npm install cipherworld-antony-mse-2103-a
```

# How to run code
- Navigate to the project directory through the command line.
- The command will take 3 or 4 arguments outlined below.
- input :
```
$ cipherWorld [cipher] [method] [file] [key]
```

-`cipher` - either `ll` (letterLetter) or `ln` (letterNumber) cipher, depending on what you are trying to encrypt/decrypt

-`method` - either `enc` (encrypt) or `dec` (decrypt)

-`file` - the filepath for the .txt file that needs encypting/decrypting

-`key` - Optional. Used for letterNumber ciphers

- This will create a new file for with the encrypted/decrypted output and store it in the same directory as the original file.

- The ciphers currently work off two character sets, the `letterNumberCipher` uses `character_set.txt` while the `letterLetterCipher (cipher.js)` uses `character_set2.txt`

- Using a `letterNumber` cipher input `ln` requires a `key`. This offsets the value returned value of the cipher by the value of the `key`
    - E.g. with no `key` - `"d" = 6`
    - With `key = 3` - `"d" = 9`

- The `key` can be any positive integer, if `key > 99` the cipher roll over to `0` and keep offsetting

- See expected outputs for further details


# Example Files
- this module comes with 4 example files that are located in:
```
[project_directory]/node_modules/cipherworld-antony-mse-2103-a/text_files
```

Copy/move these files to your working directory to test package.


# Expected outputs
- The code below will execute if the .txt files have been moved into your working directory, otherwise use their absolute/relative file paths

* Example 1: Encrypt `testLNEnc.txt` with key `31045` - LetterNumber Cipher
input code: 
```
$ cipherWorld ln enc testLNEnc.txt 31045
```

expected output: A new text file called `testLNEnc.txt.enc` containing:

 `97747470597481647759796764776413`




* Example 2: Decrypt `testLNDec.txt.enc` with key 4771 - LetterNumber Cipher
input code:
```
$ cipherWorld ln dec testLNDec.txt.enc 4771
```

expected output: A new text file called `testLNDec.txt` containing:

`Hi, Ed! I think someone's on to this cipher!`




* Example 3: Encrypt `testLLEnc.txt` - LetterLetter Cipher
input code: 
```
$ cipherWorld ll testLLEnc.txt
```

expected output: A new text  file called `testLLEnc.txt.enc` containing:

`B!!ym!9DAm2§DAD `




* Example 4: Decrypt `testLLDec.txt.enc` - LetterLetter Cipher
input code: 
```
$ cipherWorld ll dec testLLDec.txt.enc
```

expected output: A new text file called `testLLDec.txt` containing:

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

- Next challenge was to turn the program into a npm package
    - Started by researching how to create a package from the npm documentation
    - Found a couple of informative youtube videos (https://www.youtube.com/watch?v=N55jHr9qzpg&ab_channel=AndrewMead)

- Created the `package.json` file and used `npm link` to test the code by using `require()` in another directory
    - Had to rework some of the file paths for the `.readFile()` of `character_set.txt` and `character_set2.txt` within `solveCipher.js` so that the code would work when installed in another directory.
    - This ended up only being a temporary solution, as the file path now ran through `node_modules` (more explained later)

- Was able to get the code working in a different directory but was not calling `cipherWorld` directly through the command line

- After more research, configured the `bin` key in `package.json` and created a `bin` directory.
    - Set up the `cipherWorld.js` file to run in the node environment, store command line input and execute `solveCipher`

- Final block was with the file paths found in `solveCipher.js` when creating a new `LetterLetterCipher` or `LetterNumberCipher` class.
    -The file path was a relative string to `character_set.txt` but it would not work when the node package was installed in a different directory
    - Found that i needed to change the input to `${__dirname}/character_set.txt` so that it would look for character set files from the same directory as `solveCipher.js`

- Now able to execute `cipherWorld` from the command line to encrypt and decrypt text files
