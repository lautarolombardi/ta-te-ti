import { useState } from 'react'

import Winner from './components/Winner'
import Menu from './components/Menu'
import Turns from './components/Turns'
import Board from './components/Board'
import useEndGame from './hooks/useEndGame'
import usePlayerMove from './hooks/usePlayerMove'
import useAIPlayer from './hooks/useAIPlayer'

const App = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const { board, turn, winner, updateBoard, setTurn, setWinner, setBoard } =
    usePlayerMove(numberOfPlayers)
  const { resetGame, returnMenu } = useEndGame(setBoard, setTurn, setNumberOfPlayers, setWinner)

  useAIPlayer(winner, numberOfPlayers, board, updateBoard, turn)

  /// MANEJO DEL MENÚ PRINCIPAL
  const handleMenu = (e) => {
    const { id } = e.target

    setNumberOfPlayers(parseInt(id))
  }

  return (
    <main className="main">
      <h1 className="main-title">Ta-Te-Ti</h1>
      {numberOfPlayers !== 0
        ? (
          <>
            <Board board={board} turn={turn} updateBoard={updateBoard} />
            <Turns turn={turn} />
            <Winner resetFunction={resetGame} winner={winner} />
            <div>
              <button type="button" onClick={returnMenu}>
              Volver al menú
              </button>
              <button type="button" onClick={resetGame}>
              Empezar de nuevo
              </button>
            </div>
          </>
        )
        : (
          <Menu handleMenu={handleMenu} />
        )}
    </main>
  )
}

export default App
