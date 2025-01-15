import React from 'react';

function Navbar({ onButtonClick = () => {}}) {
  return (
    <nav className="navbar">
            <button className="nav-button" onClick={() => onButtonClick('allCats')}>
                Все котики
            </button>
            <button className="nav-button" onClick={() => onButtonClick('favoriteCats')}>
                Любимые котики
            </button>
    </nav>
  );
}

export default Navbar;