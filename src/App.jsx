import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './assets/pages/HomePage'
import SearchPage from './assets/pages/SearchPage'
import './App.css'
import FavoritesProvider from './assets/context/FavoritesProvider';
import FavoritesPage from './assets/pages/FavoritesPage';
import CategoryPage from './assets/pages/CategoryPage'

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
