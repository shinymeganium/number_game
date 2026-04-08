# Number Puzzle Game Plan

## Game Description

The game is a number puzzle game where the player has to place number-shaped game pieces onto a game board. The game board is a 5 by 4 grid formed of same size squares. The player places the game pieces on the sides of the squares. Squares that are next to and above/under each other share a side.

## How to Play

The objective of the game is to place all the pieces onto the sides of the squares. Pieces cannot overlap one another (one side can occupy only one part of a number). A won game allows 2 or less sides to be unoccupied.

## Game Pieces

There are 10 pieces in total. They are shaped like numbers from 0 to 9. The shape is like in a digital clock (7 segments). All the numbers except 0 are 1x2 segments. The size of the zero is 1x1.

## Rules

- There are 10 game pieces in total, one of each number (0-9).
- When a player places a piece on the board it is removed from player inventory.
- Pieces cannot overlap one another.
- The game is won when 2 or less sides are unoccupied.
- The game board is a 5 by 4 grid.
- The grid is formed of same size squares.
- Squares that are next to and above/under each other share a side.
- Pieces can be rotated but not flipped while placing then on the board.
- Pieces are placed on the sides of the squares, framing the squares instead of being inside of them.

## Visual Presentation

The app will have the following parts:

- **Header**: Contains the game title, buttons for undo and reset level.
- **Game Area**: Displays the game board.
- **Footer**: Shows the inventory of not used game pieces.

## Future Improvements

- Add animations when a piece is placed.

## Questions

- How does the game board work? How are the shared sides of the squares implemented?