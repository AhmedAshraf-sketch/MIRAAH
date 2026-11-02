import '../css/Main.css';
import NewsCard from './NewsCard';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

function Main({ initialCategory = '' }) {
    const [newsList, setNewsList] = useState([]);
    const [category, setCategory] = useState(
        initialCategory === 'latest_news' ? '' : initialCategory
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const key = 'AaUNqshS77biiXZ8YDolOyBNquQfG69wXdULdDgvuEgHD7ed';

    const endpoint = 'https://api.currentsapi.services/v2/latest-news';

    useEffect(() => {
        const controller = new AbortController();

        const getNews = async () => {
            setIsLoading(true);
            setError(null);
            setNewsList([]);

            try {
                const params = new URLSearchParams({
                    language: 'ar',
                    page_size: '20',
                    page_number: '1',
                    type: '1',
                });

                if (category) {
                    params.set('category', category);
                }

                const response = await fetch(
                    `${endpoint}?${params.toString()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${key}`,
                        },
                        signal: controller.signal,
                    }
                );

                const data = await response.json();

                if (!response.ok || data.status !== 'ok') {
                    throw new Error(
                        data.message || data.msg || `API Error: ${response.status}`
                    );
                }

                const filteredNews = (data.news || []).filter((item) => {
                    const title = item.title || '';
                    const description = item.description || '';

                    const hasArabic = /[\u0600-\u06FF]/.test(title);

                    const isMaintenance =
                        /maintenance|under maintenance/i.test(title) ||
                        /maintenance|under maintenance/i.test(description);

                    const categories = Array.isArray(item.category)
                        ? item.category
                        : [];

                    const matchesCategory =
                        !category || categories.includes(category);

                    return (
                        item.language === 'ar' &&
                        hasArabic &&
                        !isMaintenance &&
                        matchesCategory
                    );
                });

                setNewsList(filteredNews);

            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('News API Error:', err);
                    setError(err.message || 'Failed to load news.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        getNews();

        return () => controller.abort();
    }, [category]);

    const handleCategory = (selectedCategory) => {
        setCategory(
            selectedCategory === 'latest_news' ? '' : selectedCategory
        );
    };

    const handleFavorite = (id) => {
        console.log(id);
    };

    return (
        <main id="mn">
            <Navigation onCategoryChange={handleCategory} />

            <section>
                <h2 dir="ltr">News</h2>

                <ul className="news-list">
                    {isLoading && <h3>Loading...</h3>}

                    {!isLoading && error && <h3>{error}</h3>}

                    {!isLoading && !error && newsList.length === 0 && (
                        <h3>No Arabic news found in this category</h3>
                    )}

                    {!isLoading && newsList.map((newsItem) => (
                        <NewsCard
                            {...newsItem}
                            key={newsItem.id}
                            onFavorite={handleFavorite}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;