// MovieRecomendation.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import NewRecommendation from '../components/NewRecommendation';

export const MovieRecomendation = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showRecommendation, setShowRecommendation] = useState<boolean>(false);

    const handleSearchResults = (movies: any[]) => {
        setSearchResults(movies);
        setShowRecommendation(false);  // Ao pesquisar, oculte o componente de avaliação
    };

    const handleShowRecommendation = () => {
        setShowRecommendation(true);
    };

    return (
        <div>
            <Header />
            <SearchBar onSearch={handleSearchResults} />
            {searchResults.length > 0 && <MovieList movies={searchResults} />}
            {showRecommendation && <NewRecommendation onSubmit={handleShowRecommendation} />}
        </div>
    );
};

export default MovieRecomendation;
