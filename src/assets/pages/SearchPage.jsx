import { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchNews from '../components/SearchNews';
import Navigation from '../components/Navigation';
import NewsCard from '../components/NewsCard';

import '../css/SearchPage.css';
import '../css/Main.css';

function SearchPage() {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    
    const key = 'AaUNqshS77biiXZ8YDolOyBNquQfG69wXdULdDgvuEgHD7ed';

    const handleSearch = async (query) => {
        setIsLoading(true);
        setError('');
        setNewsList([]);
        setHasSearched(true);

        try {
            const params = new URLSearchParams({
                keywords: query,
                language: 'ar',
                page_size: '20',
                page_number: '1'
            });

            const response = await fetch(
                `https://api.currentsapi.services/v2/search?${params}`,
                {
                    headers: {
                        Authorization: `Bearer ${key}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok || data.status !== 'ok') {
                throw new Error(data.message || 'Unable to search news');
            }

            setNewsList(data.news || []);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Navigation />

            <main className="search-main">
                <SearchNews
                    onHandleSearch={handleSearch}
                    isLoading={isLoading}
                />

                <ul className="news-list">
                    {error && <h3>{error}</h3>}

                    {!isLoading && !error && hasSearched && newsList.length === 0 && (
                        <h3>No news found</h3>
                    )}

                    {newsList.map((newsItem) => (
                        <NewsCard
                            {...newsItem}
                            key={newsItem.id}
                        />
                    ))}
                </ul>
            </main>

            <Footer />
        </>
    );
}

export default SearchPage;