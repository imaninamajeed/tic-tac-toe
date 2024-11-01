# Code Logic

This document explains the code logic of the Tic-Tac-Toe game implemented in this project.

## Overview

The Tic-Tac-Toe game is built using React and TypeScript. The main game logic is contained in the [`src/page.tsx`](src/page.tsx) file, and the application components are located in the [`src/app/`](src/app/) directory.

## Components

### Game

The `Game` component is the main component that manages the state of the game. It is responsible for rendering the game board and handling user interactions.

### Board

The `Board` component renders the 3x3 grid of squares. It receives the current state of the game board and a callback function to handle user clicks.

### Square

The `Square` component represents a single square on the game board. It renders the value of the square (either 'X', 'O', or null) and handles click events.

## State Management

The game state is managed using React's `useState` hook. The state includes:

- `squares`: An array representing the 3x3 grid of the game board.
- `xIsNext`: A boolean indicating whether the next move is by 'X'.

## Game Logic

The game logic includes the following functions:

### handleClick

The `handleClick` function is called when a square is clicked. It updates the game state based on the current player's move and checks for a winner.

### calculateWinner

The `calculateWinner` function checks the current state of the game board to determine if there is a winner. It returns the winner ('X' or 'O') or null if there is no winner yet.

## Styling

The styles for the components are defined in the [`src/styles.css`](src/styles.css) file. Tailwind CSS is used for styling the components.

## Conclusion

This document provides a high-level overview of the code logic for the Tic-Tac-Toe game. For more detailed information, refer to the source code in the [`src/`](src/) directory.
