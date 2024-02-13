// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

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
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

//  function initialPrompt() {
//    console.log("Let's play some Scrabble!\n");
 
   // Prompt the user to enter a word
//    const word = input.question("Enter a word to score: ");
//  console.log('You entered: ${word}');
//    // Score the entered word using oldScrabbleScorer
//    const letterPoints = oldScrabbleScorer(word);
 
//    // Print the result to the console
//    console.log(letterPoints);
//  }
// // //  }To call the initial prompt to start game.
// initialPrompt ();
 
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// function initialPrompt() {
//    console.log("Let's play some scrabble!");
//  const word = input.question("Enter a word to score: ");
// //  console.log('You entered: ${word}');
//    // Score the entered word using oldScrabbleScorer
//    const letterPoints = oldScrabbleScorer(word);
 
//    // Print the result to the console
//    console.log(letterPoints);
//  }



 // Define oldPointStructure and oldScrabbleScorer as provided

// Define simpleScorer function

 

 




  
 
 
 // Define other functions and variables as provided



 // Define oldScrabbleScorer as provided




// Last Entered


// last entered
   // // Prompt user to select a scoring algorithm
   // const selectedAlgorithm = scorerPrompt();
  
   // if (selectedAlgorithm) {
   //   // Use the selected algorithm to calculate the score
   //   const score = selectedAlgorithm.scoringFunction(word);
   //   console.log(`${selectedAlgorithm.name}: ${score}`);
   // }
 
 // last entered
 
 // Modify initialPrompt function to include scoring options
 function initialPrompt() {
  console.log("Let's play some Scrabble!");
  const word = input.question("Enter a word to score: ");
return word


}
// Modify initialPrompt function to include scoring options from scoringAlgorithms array
// function initialPrompt() {
//    console.log("Let's play some Scrabble!");
//    const word = input.question("Enter a word to score: ");


 
//    // Loop through scoringAlgorithms array and print scores for each option
//    scoringAlgorithms.forEach(algorithm => {
//      const score = algorithm.scorerFunction(word);
//      console.log(`${algorithm.name}: ${score}`);
//    });
// } 


// Previous 10 lines works, but prints the below. Need to figure out how to total Old Scrabble Score.
// Let's play some Scrabble!
// Enter a word to score: sisko
// Simple Score: 5
// Vowel Bonus Score: 9
// Old Scrabble Score: Points for 'S': 1
// Points for 'I': 1
// Points for 'S': 1
// Points for 'K': 5
// Points for 'O': 1


// //  }To call the initial prompt to start game.
// initialPrompt ();



let simpleScorer = 
// function (word) {  return word.length; };
function (word) {
   let score = 0;
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++) {
     score += 1; // Each letter is worth 1 point
   }
   return score;
 }

 let vowelBonusScorer = function (word) {
  let vowelScore = 0;
  let consonantScore = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if ('AEIOU'.includes(letter)) {
      vowelScore += 3; // Vowels are worth 3 points
    } else {
      consonantScore += 1; // Consonants are worth 1 point
    }
  }
  return vowelScore + consonantScore;
};

let scrabbleScorer = function (word, structure = newPointStructure) {
  let score = 0;
  for(let i = 0; i < word.length; i++) {
    score += Number(structure[word[i]]);
  }
  return score;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Vowel Bonus Score",
    description: "Vowels are worth 3 points. Consonants are worth 1 point.",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Old Scrabble Score",
    description: "Traditional scoring algorithm for Scrabble.",
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  scoringAlgorithms.forEach((algorithm, index) => {
    console.log(`${index}: ${algorithm.name}`);
  });
  const choice = input.question("Enter the number corresponding to your choice: ");
  
  // Parse the choice to an integer
  const choiceIndex = parseInt(choice);

  // Check if the choice is valid
  if (choiceIndex >= 0 && choiceIndex < scoringAlgorithms.length) {
    // Return the selected algorithm object
    return scoringAlgorithms[choiceIndex];
  } else {
    // If the choice is invalid, return null
    console.log("Invalid choice. Please enter a number corresponding to the options.");
    return null;
  }
}

function transform(structure) {
  let newStructure = {};
  for(let num in structure) {
    for(let i = 0; i < structure[num].length; i++) {
      newStructure[structure[num][i].toLowerCase()] = Number(num);
    }
  }

  return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  // initialPrompt();
  // scorerPrompt();

  let currentWord = initialPrompt();
  let scorerObject = scorerPrompt();
  let score = scorerObject.scorerFunction(currentWord);
  console.log(`Users score for ${currentWord} is ${score}`);

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
