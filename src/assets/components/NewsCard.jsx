import '../css/NewsCard.css';
import { useState } from 'react';
import placeholder from '../images/placholder.jpg';
import FavoritesContext from '../context/FavoritesContext';
import { useContext } from 'react';

function NewsCard(props) {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(() =>
    favorites.some((item) => item.id === props.id)
  );

  function handleToggleFavorite(e) {
    e.preventDefault();
    if (favorites.some((item) => item.id === props.id)) {
      removeFromFavorites(props);
      setIsFavorite(false);
    } else {
      addToFavorites(props);
      setIsFavorite(true);
    }
  }

  return (
    <li dir="rtl">
      <section className="news-item-img">
        <img
          src={props.image}
          alt="news 1"
          onError={(e) => {
            e.target.src = placeholder;
            e.target.onError = null;
          }}
        />
      </section>

      <section className="news-item-dat">
        <h3 className="news-title zain-bold">{props.title}</h3>
        <p className="news-date">{props.published.slice(0, 10)}</p>
        <p className="news-desc zain-light">{props.description}</p>

        {/* Link to the full article */}
        <a href={`${props.url}`}>
          <button>... Continue Reading</button>
        </a>

        {/* Favorite heart button */}
        <a href="#">
          <button
            onClick={handleToggleFavorite}
            className={isFavorite ? 'fav' : ''}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </a>
      </section>
    </li>
  );
}

export default NewsCard;
