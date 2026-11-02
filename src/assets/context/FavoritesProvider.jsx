import { useState, useEffect } from 'react';
import FavoritesContext from './FavoritesContext';

function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    function addToFavorites(favorite) {
        setFavorites((prev) => {
            if (prev.some((item) => item.id === favorite.id)) {
                return prev;
            }

            return [...prev, favorite];
        });
    }

    function removeFromFavorites(favorite) {
        setFavorites((prev) =>
            prev.filter((item) => item.id !== favorite.id)
        );
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;