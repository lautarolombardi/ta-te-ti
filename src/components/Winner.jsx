import Square from './Square'

const Winner = ({ winner, resetFunction }) => {
  return (
    <>
      {winner != null && (
        <section className='winner'>
          <div className='text'>
            <h2>{winner === false ? 'Empate' : 'Ganó:'}</h2>
            <header className={winner ? 'win' : ''}>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={() => resetFunction()}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </>
  )
}

export default Winner
