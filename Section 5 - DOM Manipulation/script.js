'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let score = 20;
let secretNumber = Math.trunc((Math.random() * 20)) + 1;
let highscore = 0;


// Callback function - a function that takes a function as an argument
document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);

    // When there is no input
    if(!guess){
        document.querySelector('.message').textContent = 'No number. Please Enter a number';
    
    // When player Wins
    } else if(guess === secretNumber){
        document.querySelector('.message').textContent = 'Correct Number!';
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        if(score > highscore){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }


    // } else if(guess !== secretNumber){
    //     Number(score);
    //     score--;
    //     score = String(score);
    //     document.querySelector('.score').textContent = score;

    // When guess is too low
    } else if(guess < secretNumber){
        if(score > 1){
            document.querySelector('.message').textContent = 'Too Low!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You Lose the Game!';
            document.querySelector('.score').textContent = 0;
        }

    // When guess is too high
    } else if(guess > secretNumber){
        if(score > 1){
            document.querySelector('.message').textContent = 'Too High!';
            score--;
            document.querySelector('.score').textContent = score;
        }else {
            document.querySelector('.message').textContent = 'You Lose the Game!';
            document.querySelector('.score').textContent = 0;
        }
    }
});

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc((Math.random() * 20)) + 1;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});