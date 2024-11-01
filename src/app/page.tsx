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

  const renderSquare = (i: number) => {
    const isWinning = Array.isArray(winningSquares) && winningSquares.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        isWinning={isWinning}
      />
    );
  };

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const winningSquares = winner ? winner.line : [];

  const handlePlay = (nextSquares: (string | null)[]) => {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const status = winner
    ? `Winner: ${winner.player}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext}
          squares={squares}
          onPlay={handlePlay}
          winningSquares={winningSquares} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  return null;
};

export default Game;

