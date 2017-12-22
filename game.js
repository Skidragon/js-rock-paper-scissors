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

class Game {

  constructor() {
    this.playerScore = 0;
    this.tieScore = 0;
    this.computerScore = 0;
    this.round = 0;
  }

  start() {
    let options = document.querySelectorAll(".player-selection");

    options.forEach(option => {
      option.addEventListener("click", () => {
        this.playerSelection = option.dataset.selection;

        this.playRound();
      });
    });
  }

  playRound() {
    this.computerSelection = sample(OPTIONS);
    this.round++;

    this.findWinner();
  }

  findWinner() {
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
    this.outputMessage("You tied with the computer!");
  }

  playerWinsRound() {
    this.playerScore++;
    this.outputInformation();
    this.outputMessage(
      `${capitalize(this.playerSelection)} beats ${this.computerSelection}.`
    );
  }

  computerWinsRound() {
    this.computerScore++;
    this.outputInformation();
    this.outputMessage(
      `${capitalize(this.computerSelection)} beats ${this.playerSelection}.`
    );
  }

  outputInformation() {
    this.outputSelections();
    this.outputRound();
    this.outputScore();
  }

  outputSelections() {
    let playerSelection = document.querySelector("#player-selection");
    let computerSelection = document.querySelector("#computer-selection");

    playerSelection.innerText = capitalize(this.playerSelection);
    computerSelection.innerText = capitalize(this.computerSelection);
  }

  outputRound() {
    let round = document.querySelector("#current-round");

    round.innerText = this.round;
  }

  outputScore() {
    let playerScore = document.querySelector("#player-score");
    let tieScore = document.querySelector("#tie-score");
    let computerScore = document.querySelector("#computer-score");

    playerScore.innerText = this.playerScore;
    tieScore.innerText = this.tieScore;
    computerScore.innerText = this.computerScore;
  }

  outputMessage(message) {
    let outputMessage = document.querySelector("#output-message");

    outputMessage.innerHTML = message;
  }

}

let game = new Game();
game.start();
