import React, { useState, useEffect } from 'react';
import heart from '../image/heart.png';
import heart_fill from '../image/heart_fill.png';

function CatApi({ favoritedImages, setFavoritedImages }) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoveredImageId, setHoveredImageId] = useState(null);


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoritedImages));
    }, [favoritedImages]);
    

    useEffect(() => {
        const apiKey = "live_nJQxi0TL9RhEhTzPczVusp91YGJMwgY0AgKpDNpDD2c8gvndRJoEsZkVWP3Ahp4Z";
        const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=50&api_key=${apiKey}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setImages(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Привлекаю очаровательных котят... Пожалуйста, подождите!</p>
            </div>
        );
    }

    if (error) {
        return <div className='err'>Error: {error.message}</div>;
    }


    const handleFavoriteClick = (image) => { 
        setFavoritedImages((prevFavorites) => {
            const isFavorited = prevFavorites.some(fav => fav.id === image.id);
    
            if (isFavorited) {
                return prevFavorites.filter(fav => fav.id !== image.id); 
            } else {
                return [...prevFavorites, image];
            }
        });
    };


    return (
        <div className="cat-image-container">
            {images.map((image) => (
                <div
                    key={image.id}
                    className="cat-image-wrapper"
                >
                    <img src={image.url} alt="Cat" className="cat-image" />
                    <img
                        src={favoritedImages.some(fav => fav.id === image.id) || hoveredImageId === image.id ? heart_fill : heart} // Check if image is in favoritedImages
                        alt="Heart Icon"
                        className="heart-icon"
                        onClick={() => handleFavoriteClick(image)}
                        onMouseEnter={() => setHoveredImageId(image.id)}
                        onMouseLeave={() => setHoveredImageId(null)}
                    />
                </div>
            ))}
        </div>
    );
}


export default CatApi;