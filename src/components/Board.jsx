import Square from '../components/Square'

const Board = ({ board, turn, updateBoard }) => {
  return (
    <section className="board">
      {board.map((square, i) => (
        <Square key={i} index={i} turn={turn} updateBoard={updateBoard}>
          <span className={square ? 'square-icon square-icon-show' : 'square-icon'}>{square}</span>
        </Square>
      ))}
    </section>
  )
}

export default Board
