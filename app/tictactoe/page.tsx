"use client";
import { Button } from "@nextui-org/button";
import { useState, useEffect, useCallback } from "react";

type Player = "X" | "O" | null;
type Board = Player[];
type WinningLine = number[];

const initialBoard: Board = Array(9).fill(null);
const maxWinStack = 2;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard); // 3x3 board
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); // Player starts as 'X'
  const [score, setScore] = useState<number>(0); // Track the player's score
  const [gameOver, setGameOver] = useState<boolean>(false); // To track game state
  const [winningLine, setWinningLine] = useState<WinningLine>([]); // Track winning line
  const [playerWinStack, setPlayerWinStack] = useState<number>(0); // Track player's win stack

  // Function to determine if there is a winner
  const checkWinner = useCallback((squares: Board): Player => {
    const winPatterns: WinningLine[] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinningLine(winPatterns[i]); // Store the winning line indexes
        return squares[a]; // Return 'X' or 'O' as winner
      }
    }
    return null;
  }, []);

  // Bot's move logic
  const botPlay = (squares: Board): void => {
    const availableMoves = squares
      .map((val, index) => (val === null ? index : null))
      .filter((val) => val !== null);
    if (availableMoves.length > 0) {
      const randomMove = availableMoves[
        Math.floor(Math.random() * availableMoves.length)
      ] as number;
      squares[randomMove] = "O";
      setBoard(squares);
      setIsPlayerTurn(true); // Switch back to player
    }
  };

  // Handle player’s move
  const handlePlayerMove = (index: number): void => {
    if (board[index] || gameOver) return; // Ignore if the square is occupied or the game is over

    const newBoard = [...board];
    newBoard[index] = "X"; // Player's move as 'X'
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      handleWin(winner);
    } else {
      setIsPlayerTurn(false); // Bot's turn after player move
    }
  };

  // Handle winning logic
  const handleWin = (winner: Player): void => {
    setGameOver(true);

    if (winner === "X") {
      setScore((prevScore) => {
        if (playerWinStack === maxWinStack) {
          setPlayerWinStack(0); // Reset player win stack after 3 consecutive wins
          return prevScore + 3; // 1 point for this win + 2 bonus points
        } else {
          setPlayerWinStack(playerWinStack + 1); // Increment the win stack
          return prevScore + 1; // Normal win: add 1 point
        }
      });
    }
  };

  const resetGame = (): void => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinningLine([]);
  };

  // Handle bot’s turn in a separate effect
  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const newBoard = [...board];
      setTimeout(() => {
        botPlay(newBoard); // Bot takes a move
        const winner = checkWinner(newBoard);
        if (winner) {
          setGameOver(true);
          setScore((prevScore) => {
            if (prevScore == 0) {
              return 0;
            } else {
              return prevScore - 1;
            }
          }); // Deduct score for bot win
          setPlayerWinStack(0); // Reset player win stack on bot win
        }
      }, 500);
    }
  }, [isPlayerTurn, gameOver]);

  const isDraw = board.every((square) => square !== null);

  return (
    <div>
      <div className="my-3">
        <h2 className="text-xl font-bold">Tic Tac Toe</h2>
        <p className="text-sm">Player vs Bot</p>
      </div>
      <div className="grid grid-cols-3">
        {board.map((value, index) => (
          <Button
            className="h-[100px]  border border-black-600"
            radius="none"
            size="lg"
            key={index}
            onClick={() => handlePlayerMove(index)}
            isDisabled={!isPlayerTurn}
          >
            <span
              className={
                winningLine.includes(index)
                  ? "text-red-500 font-bold text-xl"
                  : "text-black-600 text-xl"
              }
            >
              {value}
            </span>
          </Button>
        ))}
      </div>
      <div className="py-4">
        <p className="text-xl text-primary-500">Your score: {score}</p>
        <p className="text-gray-600 text-sm">
          Win stack: {playerWinStack} (win 3 times get bonus points!)
        </p>
      </div>
      {(gameOver || isDraw) && (
        <Button onClick={resetGame} color="primary">
          Start New Game
        </Button>
      )}
    </div>
  );
};

export default TicTacToe;
