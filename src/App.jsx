import { useState } from 'react'
import Square from './components/Square'
import confetti from 'canvas-confetti'
import { TURNS, WINNER_COMBOS } from './const'
import Winner from './components/Winner'

const App = () => {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)

  const checkEndGame = newBoard => {
    return newBoard.every(sq => sq != null)
  }

  const updateBoard = index => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const checkWinner = boardToCheck => {
    for (let combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <section className='game'>
        {board.map((square, i) => (
          <Square key={i} index={i} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <Winner winner={winner} resetFunction={resetGame} />

      <button onClick={resetGame}>Empezar de nuevo</button>
    </main>
  )
}

export default App
