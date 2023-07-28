import {useEffect} from "react";

import {TURNS, WINNER_COMBOS} from "../constants";

const useAIPlayer = (winner, numberOfPlayers, board, updateBoard, turn) => {
  useEffect(() => {
    if (winner !== null || turn === TURNS.X || numberOfPlayers === 2) return;

    const newBoard = [...board];

    const getEmptySpaces = () => {
      return newBoard.reduce((emptySpaces, value, index) => {
        if (value === null) {
          emptySpaces.push(index);
        }
        return emptySpaces;
      }, []);
    };

    const getPreviousMoves = (player) => {
      return newBoard.reduce((emptySpaces, value, index) => {
        if (value === player) {
          emptySpaces.push(index);
        }
        return emptySpaces;
      }, []);
    };

    const getWinningMove = (player) => {
      let emptySpaces = getEmptySpaces();
      let previousMoves = getPreviousMoves(player);

      let winningMove = null;

      for (let combo of WINNER_COMBOS) {
        const [a, b, c] = combo;

        if (previousMoves.includes(a) && previousMoves.includes(b) && emptySpaces.includes(c)) {
          winningMove = c;
          return winningMove;
        } else if (
          previousMoves.includes(b) &&
          previousMoves.includes(c) &&
          emptySpaces.includes(a)
        ) {
          winningMove = a;
          return winningMove;
        } else if (
          previousMoves.includes(a) &&
          previousMoves.includes(c) &&
          emptySpaces.includes(b)
        ) {
          winningMove = b;
          return winningMove;
        }
      }

      return winningMove;
    };

    setTimeout(() => {
      let winningMovePlayer = getWinningMove(TURNS.X);
      let winningMoveAI = getWinningMove(TURNS.O);

      if (winningMoveAI !== null) {
        updateBoard(winningMoveAI);
      } else if (winningMovePlayer !== null) {
        updateBoard(winningMovePlayer);
      } else {
        updateBoard(getEmptySpaces()[Math.floor(Math.random() * getEmptySpaces().length)]);
      }
    }, 800);
  }, [turn, numberOfPlayers, board, updateBoard, winner]);
};

export default useAIPlayer;
