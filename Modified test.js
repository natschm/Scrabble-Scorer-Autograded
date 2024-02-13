const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

function initialPrompt() {
  console.log("Let's play some Scrabble!");
  const word = input.question("Enter a word to score: ");
  const letterPoints = oldScrabbleScorer(word);
  console.log(letterPoints);
}

let simpleScorer = function(word) {
  return word.length;
};

let vowelBonusScorer = function(word) {
  word = word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    if ('AEIOU'.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScorer = function(word) {
  word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
};

const scoringAlgorithms = [
  { name: 'Simple Score', description: 'Each letter is worth 1 point.', scoringFunction: simpleScorer },
  { name: 'Vowel Bonus Score', description: 'Vowels are 3 pts, consonants are 1 pt.', scoringFunction: vowelBonusScorer },
  { name: 'Old Scrabble Score', description: 'The traditional scoring algorithm.', scoringFunction: scrabbleScorer }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple Score: Each letter is worth 1 point.");
  console.log("1 - Vowel Bonus Score: Vowels are 3 pts, consonants are 1 pt.");
  console.log("2 - Old Scrabble Score: The traditional scoring algorithm.");
  const choice = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[choice];
}

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (const pointValue in oldPointStructure) {
    oldPointStructure[pointValue].forEach(letter => {
      newPointStructure[letter.toLowerCase()] = Number(pointValue);
    });
  }
  return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  const chosenAlgorithm = scorerPrompt();
  const word = input.question("Enter a word to score: ");
  const score = chosenAlgorithm.scoringFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

runProgram();