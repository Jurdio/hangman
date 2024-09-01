const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let wordToGuess = '';
let guessedLetters = [];
let remainingAttempts;
const delimiter = '==============================================================';

function printHangman(mistakes) {
    const stages = [
        `
           -----
           |   |
           O   |
          /|\\  |
          / \\  |
               |
        =========
        `,
        `
           -----
           |   |
           O   |
          /|\\  |
          /    |
               |
        =========
        `,
        `
           -----
           |   |
           O   |
          /|\\  |
               |
               |
        =========
        `,
        `
           -----
           |   |
           O   |
          /|   |
               |
               |
        =========
        `,
        `
           -----
           |   |
           O   |
           |   |
               |
               |
        =========
        `,
        `
           -----
           |   |
           O   |
               |
               |
               |
        =========
        `,
        `
           -----
           |   |
               |
               |
               |
               |
        =========
        `
    ];
    console.log(stages[mistakes]);
}

function generateWordForGuessing() {
    fs.readFile('words.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file');
            console.error(err);
            return;
        }
        const words = data.split('\n').filter(Boolean);
        const randomIndex = Math.floor(Math.random() * words.length);
        wordToGuess = words[randomIndex].trim();
        guessedLetters = Array(wordToGuess.length).fill('_');
        console.log(delimiter);
        console.log("\t\t\tNEW GAME");
        console.log(delimiter);
        console.log('The word has been chosen. Start guessing!');
        promptForLetter();
    });
}

function promptForLetter() {
    console.log(delimiter);
    printHangman(remainingAttempts);
    console.log(`\nWord: ${guessedLetters.join(' ')}`);
    console.log(`Remaining attempts: ${remainingAttempts}`);
    rl.question('Guess a letter: ', (letter) => {
        if (letter.length !== 1) {
            console.log('Please enter a single letter.');
            promptForLetter();
            return;
        }
        checkLetter(letter);
    });
}

function checkLetter(letter) {
    // Перетворення введеної літери в нижній регістр
    letter = letter.toLowerCase();

    // Перевірка на латинську букву
    if (!/^[a-z]$/.test(letter)) {
        console.log("Please enter a valid letter (Latin alphabet only).");
        promptForLetter();
        return;
    }

    let correctGuess = false;
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
            guessedLetters[i] = letter;
            correctGuess = true;
        }
    }
    if (!correctGuess) {
        remainingAttempts--;
        console.log('Nope, try again!');
    } else {
        console.log('Correct letter!');
    }

    if (guessedLetters.join('') === wordToGuess) {
        console.log(`Congratulations! You've guessed the word: ${wordToGuess}`);
        start();
    } else if (remainingAttempts === 0) {
        console.log(delimiter);
        console.log(`Game over! The word was: ${wordToGuess}`);
        console.log(delimiter);
        printHangman(remainingAttempts);
        start();
    } else {
        promptForLetter();
    }
}

function getUserChoiceAndStartGameOrExit() {
    rl.question('\nEnter your choice: ', (answer) => {
        switch (answer) {
            case '1':
                remainingAttempts = 6;
                console.log('You chose to start a new game');
                generateWordForGuessing();
                break;
            case '2':
                console.log('You chose to exit');
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('You entered an invalid value, try again!');
                getUserChoiceAndStartGameOrExit();
                break;
        }
    });
}

function start() {
    console.log('Make a choice: \n1 - start new game\n2 - exit');
    getUserChoiceAndStartGameOrExit();
}
console.log('\nHello, it is hangman game!');
start();
