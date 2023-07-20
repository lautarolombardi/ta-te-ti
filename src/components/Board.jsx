import Square from "../components/Square";

const Board = ({board, turn, updateBoard}) => {
  return (
    <section className="board">
      {board.map((square, i) => (
        <Square key={i} index={i} updateBoard={updateBoard} turn={turn}>
          {square}
        </Square>
      ))}
    </section>
  );
};

export default Board;
