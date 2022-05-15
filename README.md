# Unit 1 - Project (Javascript Game) : Memory Game

<br>

## Introduction
This memory game is similar to any ordinary memory game where all the cards are facing down. The goal is to match n pairs of cards on the board, and you are only allowed to flip two cards
each turn. An unmatched pair with result in the cards flipping back down, while a matched pair will be voided and no longer playable. The challenge of the game is to remember the position
of each card from the last time you revealed it. 

### • Pokemon theme Memory Game with a twist
However, this memory game includes levels, which you will have to clear 7 boards to catch 7 Pokemon. Each level will have progressively lesser time.

<br>

## Technologies Used

No additional technologies used - (Vanilla) Javascript.

<br>

## Approach Taken

### Methods Used:
1. push()
2. querySelector()
3. getAttribute()
4. createElement()
5. appendChild()
6. Math.random()
7. sort()
8. For loops

### Game Elements

#### • Cards
Create an array of cards where each card has a duplicate inside. Each card is represented as an object, with its name and image link as its keys. 

#### • Game Board
Create a 300px by 400px grid and use a for loop for the cardArray to push each card into the grid, giving each card an attribute of id and card back image.

#### • Audio
Included audio for:
1. Background music
2. Card clicks
3. Start and Reset buttons - to indicate start of level
4. When board is cleared - to indicate end of level

#### • Progress Bar
Create two simple rectangle shapes, one with a black border and no fill, another with no border and green fill. 
In app.js, create a constructor that calls out the element. Functions in the constructor will change the CSS (width % according to how many cards are won) and limit the numbers (0-100 only).

#### • Start and Reset Buttons
Start button invokes startGame() function that will:
1. Start game
2. Restart game (only when entire game is won)
3. Advance next level

Reset button invokes resetGame() function that will:
1. Call out the startGame() function.
2. Reset the game to the very first level at any point in the game. 

### Mechanism
Create a click event listener for the grid.children, and for each click, the card chosen will be pushed into a dedicated empty array (limited to two elements) which will invoke the 
checkForMatch() function. 

<br>

## Unsolved Problems

### • Glitches

1. Able to restart the timer for each round, due to the shared logic of the start/reset/nextlevel feature.