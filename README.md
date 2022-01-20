# Unit 1 - Project (Javascript Game) : Memory Game

<br>

## Introduction

This memory game is like any ordinary memory game where all the cards are facing down. The goal is to match n pairs of cards on the board, and you are only allowed to flip two cards
each turn. An unmatched pair with result in the cards flipping back down, while a matched pair will be voided and no longer playable. The challenge of the game is to remember the position
of each card from the last time you revealed it. 

<br>

<br>

## Technologies Used

No additional technologies used - Vanilla Javascript

## Approach Taken

### Methods:
1. push()
2. querySelector()
3. getAttribute()
4. createElement()
5. appendChild()
6. Math.random()
7. sort()
8. For loops

### Cards
Create an array of cards where each card has a duplicate inside. Each card is represented as an object, with its name and image link as its keys. 

### Game Board
Create a 300px by 400px grid and use a for loop for the cardArray to push each card into the grid, giving each card an attribute of id and card back image.

### Mechanism
Create a click event listener for the grid.children, and for each click, the card chosen will be pushed into a dedicated empty array (limited to two elements) which will invoke the 
checkForMatch function. 

### Audio
Include audio for:
1. Background music
2. Card clicks
3. Start and Reset buttons - to indicate start of level

### Progress Bar

### Start and Reset Buttons
















## Unsolved Problems

### Glitches

1. Able to restart the timer for each round, due to shared logic of start and next level function button. 