import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Select, SelectItem } from "@heroui/react";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { TrophyIcon } from "@/components/icons/TrophyIcon";
import { Medal } from "@/components/icons/Medal";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const xIconOptions = [
  { key: "X", label: "X", icon: <span className="font-bold">X</span> },
  { key: "heart", label: "Heart", icon: <HeartIcon className="text-danger" /> },
  { key: "trophy", label: "Trophy", icon: <TrophyIcon className="text-warning" /> },
  { key: "medal", label: "Medal", icon: <Medal className="text-primary" /> },
];

const difficultyOptions = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
];

const emptyBoard = Array(9).fill("");

const checkWinner = (board: string[]) => {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((c) => c)) {
    return "tie";
  }
  return null;
};

function getRandomMove(board: string[]) {
  const empty = board
    .map((val, idx) => (val === "" ? idx : -1))
    .filter((i) => i !== -1);
  return empty[Math.floor(Math.random() * empty.length)];
}

function getMediumMove(board: string[]) {
  // win if possible
  for (const idx of board.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1)) {
    const copy = [...board];
    copy[idx] = "O";
    if (checkWinner(copy) === "O") return idx;
  }
  // block player
  for (const idx of board.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1)) {
    const copy = [...board];
    copy[idx] = "X";
    if (checkWinner(copy) === "X") return idx;
  }
  return getRandomMove(board);
}

function minimax(board: string[], isMax: boolean): number {
  const winner = checkWinner(board);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (winner === "tie") return 0;

  const moves = board.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1);

  if (isMax) {
    let best = -Infinity;
    for (const idx of moves) {
      board[idx] = "O";
      const score = minimax(board, false);
      board[idx] = "";
      best = Math.max(best, score);
    }
    return best;
  } else {
    let best = Infinity;
    for (const idx of moves) {
      board[idx] = "X";
      const score = minimax(board, true);
      board[idx] = "";
      best = Math.min(best, score);
    }
    return best;
  }
}

function getHardMove(board: string[]) {
  let bestScore = -Infinity;
  let move = getRandomMove(board);
  for (const idx of board.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1)) {
    board[idx] = "O";
    const score = minimax(board, false);
    board[idx] = "";
    if (score > bestScore) {
      bestScore = score;
      move = idx;
    }
  }
  return move;
}

const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<string[]>([...emptyBoard]);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [iconKey, setIconKey] = useState<string>("X");
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const makeBotMove = (newBoard: string[]) => {
    let idx = 0;
    if (difficulty === "easy") idx = getRandomMove(newBoard);
    if (difficulty === "medium") idx = getMediumMove(newBoard);
    if (difficulty === "hard") idx = getHardMove(newBoard);
    newBoard[idx] = "O";
    const result = checkWinner(newBoard);
    setBoard([...newBoard]);
    if (result) {
      setWinner(result);
    } else {
      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timeout = setTimeout(() => {
        makeBotMove([...board]);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isPlayerTurn]);

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    const result = checkWinner(newBoard);
    setBoard(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard([...emptyBoard]);
    setWinner(null);
    setIsPlayerTurn(true);
  };

  const renderIcon = (cell: string) => {
    if (cell === "O") return <span className="text-2xl">O</span>;
    if (cell === "X") {
      const selected = xIconOptions.find((x) => x.key === iconKey);
      return selected ? selected.icon : <span className="text-2xl">X</span>;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-col gap-4">
          <Select
            label="Level"
            selectedKeys={[difficulty]}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficultyOptions.map((o) => (
              <SelectItem key={o.key}>{o.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Icon"
            selectedKeys={[iconKey]}
            onChange={(e) => setIconKey(e.target.value)}
          >
            {xIconOptions.map((o) => (
              <SelectItem key={o.key} startContent={o.icon}>
                {o.label}
              </SelectItem>
            ))}
          </Select>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-2 w-full mx-auto">
            {board.map((cell, i) => (
              <Button
                key={i}
                className="h-20 text-2xl"
                variant="bordered"
                onPress={() => handleCellClick(i)}
              >
                {renderIcon(cell)}
              </Button>
            ))}
          </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2">
          {winner && (
            <p className="text-center font-semibold">
              {winner === "tie" ? "It's a tie!" : winner === "X" ? "You win!" : "Bot wins!"}
            </p>
          )}
          <Button color="primary" onPress={resetGame}>
            New Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicTacToeGame;
