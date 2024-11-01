"use client"

import './styles.css';
import { useState, useMemo } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinning: boolean;
}

const Square = ({ value, onSquareClick, isWinning }: SquareProps) => (
  <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onSquareClick}>
    {value}
  </button>
);

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (squares: (string | null)[]) => void;
  winningSquares: number[] | string | null;
}

const Board = ({ xIsNext, squares, onPlay, winningSquares }: BoardProps) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onSquareClick={() => handleClick(i)}
      isWinning={Array.isArray(winningSquares) && winningSquares.includes(i)}
    />
  );

  const renderBoardRow = (start: number) => (
    <div className="board-row">
      {renderSquare(start)}
      {renderSquare(start + 1)}
      {renderSquare(start + 2)}
    </div>
  );

  return (
    <>
      <div className="status">{status}</div>
      {renderBoardRow(0)}
      {renderBoardRow(3)}
      {renderBoardRow(6)}
    </>
  );
};

const Game = () => {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const winningSquares = calculateWinner(currentSquares);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winningSquares} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;

