'use strict';

// Selecting Elements
const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);
const p1ScoreEl = document.querySelector('#score--0');
const p2ScoreEl = document.getElementById('score--1');
const p1CurrentScoreEl = document.querySelector('#current--0');
const p2CurrentScoreEl = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
    const scores;
    let currentScore;
    let activePlayer;
    let playing;
const init = () => {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    p1ScoreEl.textContent = 0;
    p2ScoreEl.textContent = 0;
    p1CurrentScoreEl.textContent = 0;
    p2CurrentScoreEl.textContent = 0;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    diceEl.classList.add('hidden');
}

init();

const switchPlayers = () => {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

//Rolling Dice
btnRoll.addEventListener('click', () => {
    if(playing){
        //1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display dice
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');
        //3. Check if 1 was rolled
        if(dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            // p1CurrentScoreEl.textContent = currentScore;
        } else {
            switchPlayers();
        }
    }
});

btnHold.addEventListener('click', () => {
    // Add current score to score of active player
    if(playing){
        scores[activePlayer] += currentScore;
        activePlayer === 0 ? p1ScoreEl.textContent = scores[0] : p2ScoreEl.textContent = scores[1];
        // Check if player's score is > 100
        if(scores[activePlayer] >= 100){
            playing = false;
            activePlayer === 0 ? player1.classList.add('player--winner') : player2.classList.add('player--winner');
            activePlayer === 0 ? player1.classList.remove('player--active') : player2.classList.remove('player--active');
            diceEl.classList.add('hidden');
        }else{
            switchPlayers();
        }
    }
});


btnNew.addEventListener('click',init());
