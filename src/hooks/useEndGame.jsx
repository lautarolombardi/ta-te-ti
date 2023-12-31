import { WINNER_COMBOS, TURNS } from '../constants'

const useEndGame = (setBoard, setTurn, setCountPlayers, setWinner) => {
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo

      if (boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }

    return null
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((sq) => sq != null)
  }

  const returnMenu = () => {
    setCountPlayers(0)
    resetGame()
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return {
    checkWinner,
    checkEndGame,
    resetGame,
    returnMenu
  }
}

export default useEndGame
