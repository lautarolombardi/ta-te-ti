import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from '../constants'

import useEndGame from './useEndGame'

const usePlayerMove = () => {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)
  const { checkWinner, checkEndGame } = useEndGame(setBoard, setTurn, setWinner)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]

    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
  }

  return { turn, board, winner, updateBoard, setBoard, setWinner, setTurn }
}

export default usePlayerMove
