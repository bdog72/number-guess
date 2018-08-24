/* global document window */

// Game Values

const min = 1;

const max = 10;
const winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements

const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Set mesage
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);
  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// listen for guess
guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > 10) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game Over - Won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game Over, you lost. the correct number was ${winningNum}`);
    } else {
      // Game Continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';

      // tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});
