const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserChoiceAndStartGameOrExit(){
    rl.question('Enter your choice: ', (answer) => {
        if (answer === '1') {
            console.log('You choose start new game');
            rl.close();
        } else if (answer === '2') {
            console.log('You choose exit');
            rl.close();
            process.exit(0);
        } else {
            console.log('You enter invalid value');
            start();
            validateUserChoiсe();
        }
    }
)};

function generateWordForGuessing (){
    
}

function start() {
    console.log('Hello, it is hangman game!');
    console.log('For start new game make a choice: 1 - start new game, 2 - exit');
    getUserChoiceAndStartGameOrExit();
}

start();