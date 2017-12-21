// Returns a random element from an array.
const sample = array => array[Math.floor(Math.random() * array.length)];

const OPTIONS = ["rock", "paper", "scissors"];

function computerTurn() {
  return sample(OPTIONS);
}

console.log(computerTurn());
