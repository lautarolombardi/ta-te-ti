import {useEffect} from "react";
import {TURNS, WINNER_COMBOS} from "../constants";

const useAIPlayer = (board, turn, numberOfPlayers, updateBoard) => {
  useEffect(() => {
    if (turn === TURNS.X || numberOfPlayers === 2) return;

    const newBoard = [...board];

    const getPreviousMoves = () => {
      let moves = newBoard.reduce((acc, sq, i) => {
        if (sq === TURNS.O) {
          acc.push(i);
        }
        return acc;
      }, []);
      return moves;
    };

    const getWinningMove = (boardToCheck) => {
      let previousMoves = getPreviousMoves();
      const relevantWinningCombinations = WINNER_COMBOS.filter((combo) =>
        combo.some((cell) => previousMoves.includes(cell)),
      );

      for (let combo of relevantWinningCombinations) {
        const [a, b, c] = combo;
        if (
          boardToCheck[a] === TURNS.O &&
          boardToCheck[b] === TURNS.O &&
          boardToCheck[c] === null
        ) {
          return c;
        }
        if (
          boardToCheck[a] === TURNS.O &&
          boardToCheck[b] === null &&
          boardToCheck[c] === TURNS.O
        ) {
          return b;
        }
        if (
          boardToCheck[a] === null &&
          boardToCheck[b] === TURNS.O &&
          boardToCheck[c] === TURNS.O
        ) {
          return a;
        }
      }
      return null;
    };

    setTimeout(() => {
      let winningMove = getWinningMove(newBoard);
      if (winningMove === null) {
        let emptySpaces = [];
        for (let i = 0; i < 9; i++) {
          if (newBoard[i] === null) {
            emptySpaces.push(i);
          }
        }

        let randomIndex = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        updateBoard(randomIndex);
      } else {
        updateBoard(winningMove);
      }
    }, 500);
  }, [updateBoard, turn, numberOfPlayers, board]);
};

export default useAIPlayer;
