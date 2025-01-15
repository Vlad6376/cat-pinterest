import React from 'react';
import heart_fill from '../image/heart_fill.png';

function Favorites({ favoritedImages, setFavoritedImages }) {

    const handleFavoriteClick = (image) => {
        setFavoritedImages((prevFavorites) => prevFavorites.filter((fav) => fav.id !== image.id));
    };


    return (
        <div className="cat-image-container">
            {favoritedImages.map((image) => (
                <div key={image.id} className="cat-image-wrapper">
                    <img src={image.url} alt="Cat" className="cat-image" />
                    <img
                        src={heart_fill}
                        alt="Filled Heart Icon"
                        className="heart-icon"
                        onClick={() => handleFavoriteClick(image)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            ))}
        </div>
    );
}

export default Favorites;