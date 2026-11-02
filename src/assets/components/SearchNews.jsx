import { useState } from 'react';
import '../css/SearchNews.css';

function SearchNews({ onHandleSearch, isLoading }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const query = searchQuery.trim();

        if (query) {
            onHandleSearch(query);
        }
    };

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search News"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
                className="search-btn"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
}

export default SearchNews;