import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../css/FavoritesPage.css';
import '../css/Main.css';
import FavoritesContext  from '../context/FavoritesContext'
import {useContext} from 'react'
import NewsCard from '../components/NewsCard';

function FavoritesPage() {
const {favorites}=useContext(FavoritesContext)

const handleCategory=(category)=>{
    console.log(category);
}

console.log(favorites)
    return (
        <>
        <Header />
        <main className="favorites-main">
        <Navigation onCategoryChange={handleCategory}/>
        <ul className="news-list">
        {favorites.map(newsItem =>
             <NewsCard key={newsItem.id} {...newsItem}/>)}
             </ul>
        </main>

        <Footer />
        </>
    )
}
export default FavoritesPage;
