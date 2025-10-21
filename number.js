#!/usr/bin/env node
// number-guessing-cli.js
const readline = require("readline");

// Create input/output interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function startGame() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.\n");

  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)\n");

  const choice = await ask("Enter your choice: ");
  let maxChances;

  switch (choice.trim()) {
    case "1":
      maxChances = 10;
      console.log("\nEasy mode selected.\n");
      break;
    case "2":
      maxChances = 5;
      console.log("\nMedium mode selected.\n");
      break;
    case "3":
      maxChances = 3;
      console.log("\nHard mode selected.\n");
      break;
    default:
      console.log("\nInvalid choice, defaulting to Medium.\n");
      maxChances = 5;
  }

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  while (attempts < maxChances) {
    const guess = await ask(`Enter your guess (${attempts + 1}/${maxChances}): `);
    const num = parseInt(guess, 10);

    if (isNaN(num) || num < 1 || num > 100) {
      console.log(" Please enter a valid number between 1 and 100.\n");
      continue;
    }

    attempts++;

    if (num === randomNumber) {
      console.log(`\n Correct! You guessed the number in ${attempts} attempt(s)!`);
      rl.close();
      return;
    } else if (num > randomNumber) {
      console.log(" The number is smaller.\n");
    } else {
      console.log(" The number is larger.\n");
    }
  }

  console.log(`\n You've run out of chances! The correct number was ${randomNumber}.\n`);
  rl.close();
}

startGame();
