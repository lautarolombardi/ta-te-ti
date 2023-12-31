const Menu = ({ handleMenu }) => {
  return (
    <div>
      <button id="1" onClick={(e) => handleMenu(e)}>
        1 jugador
      </button>
      <button id="2" onClick={(e) => handleMenu(e)}>
        2 jugadores
      </button>
    </div>
  )
}

export default Menu
