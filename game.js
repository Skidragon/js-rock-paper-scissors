// Capitalizes first letter of word.
const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join("").toLowerCase();

// Returns a random element from an array.
const sample = array => array[Math.floor(Math.random() * array.length)];

const OPTIONS = ["rock", "paper", "scissors"];

const DEFEATEDBY = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

const BUTTONS = document.querySelectorAll(".player-selection");

class Game {

  constructor() {
    this.playerScore = 0;
    this.tieScore = 0;
    this.computerScore = 0;
    this.round = 0;
  }

  start() {
    BUTTONS.forEach(button => {
      button.addEventListener("click", () => {
        this.animateButton(button);
        this.playerSelection = button.dataset.selection;

        this.playRound();
      });
    });
  }

  animateButton(button) {
    button.classList.add("btn-animated");

    window.setTimeout(() => {
      button.classList.remove("btn-animated");
    }, 1000);
  }

  playRound() {
    this.computerSelection = sample(OPTIONS);
    this.round++;

    this.delayedOutputRound();
    this.delayedOutputEmoji("😯");
    this.countDown();
    this.findWinner();
  }

  delayedOutputRound() {
    let round = document.querySelector("#current-round");

    window.setTimeout(() => {
      round.innerText = `Round ${this.round}`;
    }, 1000);
  }

  delayedOutputEmoji(emoji) {
    window.setTimeout(() => {
      this.outputEmoji(emoji);
    }, 1000);
  }

  countDown() {
    this.disableButtons();
    this.startCountDown();
  }

  disableButtons() {
    BUTTONS.forEach(button => {
      button.disabled = true;
    });

    window.setTimeout(() => {
      BUTTONS.forEach(button => {
        button.disabled = false;
      });
    }, 4000);
  }

  startCountDown() {
    let seconds = 3;
    let outputs = document.querySelectorAll(".output-selection");

    setInterval(() => {
      if (seconds > 0) {
        outputs.forEach(output => {
          output.innerText = seconds;
        });
        this.outputMessage(".".repeat(seconds));
        seconds--;

      } else {
        return;
      }
    }, 1000);
  }

  findWinner() {
    window.setTimeout(() => {
      if (this.round < 5) return this.findRoundWinner();

      return this.findGameWinner();
    }, 4000);
  }

  findRoundWinner() {
    if (this.playerSelection == this.computerSelection) {
      return this.tieInRound();

    } else if (this.computerSelection == DEFEATEDBY[this.playerSelection]) {
      return this.playerWinsRound();
    }

    return this.computerWinsRound();
  }

  tieInRound() {
    this.tieScore++;
    this.outputInformation();
    this.outputEmoji("😕");
    this.outputMessage("Tie!");
  }

  playerWinsRound() {
    this.playerScore++;
    this.outputInformation();
    this.outputEmoji("😁");
    this.outputMessage(
      `${capitalize(this.playerSelection)} beats ${this.computerSelection}.`
    );
  }

  computerWinsRound() {
    this.computerScore++;
    this.outputInformation();
    this.outputEmoji("😞");
    this.outputMessage(
      `${capitalize(this.computerSelection)} beats ${this.playerSelection}.`
    );
  }

  findGameWinner() {
    this.increaseRoundScore();

    if (this.playerScore > this.computerScore) {
      return this.playerWinsGame();

    } else if (this.computerScore > this.playerScore) {
      return this.computerWinsGame();
    }

    return this.theresNoWinner();
  }

  increaseRoundScore() {
    if (this.playerSelection == this.computerSelection) {
      return this.tieScore++;

    } else if (this.computerSelection == DEFEATEDBY[this.playerSelection]) {
      return this.playerScore++;
    }

    return this.computerScore++;
  }

  playerWinsGame() {
    this.outputInformation();
    this.outputEmoji("😂");
    this.outputMessage("You won the game!");
    this.prepareGameRestart();
  }

  computerWinsGame() {
    this.outputInformation();
    this.outputEmoji("😢");
    this.outputMessage("Ouch! The computer wins.");
    this.prepareGameRestart();
  }

  theresNoWinner() {
    this.outputInformation();
    this.outputEmoji("😒");
    this.outputMessage("There's no winner!");
    this.prepareGameRestart();
  }

  outputInformation() {
    this.outputSelections();
    this.outputScore();
  }

  outputSelections() {
    let playerSelection = document.querySelector("#player-selection");
    let computerSelection = document.querySelector("#computer-selection");

    playerSelection.innerText = capitalize(this.playerSelection);
    computerSelection.innerText = capitalize(this.computerSelection);
  }

  outputScore() {
    let playerScore = document.querySelector("#player-score");
    let tieScore = document.querySelector("#tie-score");
    let computerScore = document.querySelector("#computer-score");

    playerScore.innerText = this.playerScore;
    tieScore.innerText = this.tieScore;
    computerScore.innerText = this.computerScore;
  }

  outputEmoji(emoji) {
    this.outputMessage(emoji, "#output-emoji");
  }

  outputMessage(message, element = "#output-message") {
    let outputMessage = document.querySelector(element);

    outputMessage.innerHTML = message;
  }

  prepareGameRestart() {
    this.toggleElement("#options-restart");
    this.toggleElement("#options-throw");
    this.listenForRestart();
  }

  toggleElement(id) {
    let element = document.querySelector(id);

    element.classList.toggle("display-none");
  }

  listenForRestart() {
    let restartGame = document.querySelector("#restart-game");

    restartGame.addEventListener("click", () => {
      this.restartGame();
    });
  }

  restartGame() {
    location.reload();
  }

}

new Game().start();
