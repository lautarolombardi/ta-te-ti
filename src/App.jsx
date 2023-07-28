import {useState} from "react";

///COMPONENTES
import Winner from "./components/Winner";
import Menu from "./components/Menu";
import Turns from "./components/Turns";
import Board from "./components/Board";

///HOOKS
import useEndGame from "./hooks/useEndGame";
import usePlayerMove from "./hooks/usePlayerMove";
import useAIPlayer from "./hooks/useAIPlayer";

const App = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const {board, turn, winner, updateBoard, setTurn, setWinner, setBoard} =
    usePlayerMove(numberOfPlayers);
  const {resetGame, returnMenu} = useEndGame(setBoard, setTurn, setNumberOfPlayers, setWinner);
  useAIPlayer(numberOfPlayers, board, updateBoard, turn);

  ///MANEJO DEL MENÚ PRINCIPAL
  const handleMenu = (e) => {
    const {id} = e.target;
    setNumberOfPlayers(parseInt(id));
  };

  return (
    <main className="main">
      <h1 className="main-title">Ta-Te-Ti</h1>
      {numberOfPlayers !== 0 ? (
        <>
          <Board board={board} turn={turn} updateBoard={updateBoard} />
          <Turns turn={turn} />
          <Winner winner={winner} resetFunction={resetGame} />
          <div>
            <button onClick={returnMenu} type="button">
              Volver al menú
            </button>
            <button onClick={resetGame} type="button">
              Empezar de nuevo
            </button>
          </div>
        </>
      ) : (
        <Menu handleMenu={handleMenu} />
      )}
    </main>
  );
};

export default App;
