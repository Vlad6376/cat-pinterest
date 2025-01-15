import React, { useState, useEffect } from 'react';
import CatApi from './CatApi';
import Navbar from './NavBar';
import Favorites from './Favorites';

function NavLinks() {
    const [activePage, setActivePage] = useState('allCats');
    const [favoritedImages, setFavoritedImages] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => { 
        localStorage.setItem('favorites', JSON.stringify(favoritedImages));
    }, [favoritedImages]);

    const handleButtonClick = (page) => {
        setActivePage(page);
    };

    return (
        <div>
            <Navbar onButtonClick={handleButtonClick} />
            {activePage === 'allCats' && (
                <CatApi favoritedImages={favoritedImages} setFavoritedImages={setFavoritedImages} />
            )}
            {activePage === 'favoriteCats' && (
                <Favorites favoritedImages={favoritedImages} setFavoritedImages={setFavoritedImages} />
            )}
        </div>
    );
}

export default NavLinks;