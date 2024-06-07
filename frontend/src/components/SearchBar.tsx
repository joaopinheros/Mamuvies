import React, { useState } from 'react';
import { MovieApi } from '../api/MovieApi';

interface SearchBarProps {
  onSearch: (movies: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]); // Adiciona estado para sugestões de filmes

  const handleSearch = async () => {
    try {
      const response = await MovieApi.searchMovies(query);
      if (response && response.results) {
        onSearch(response.results);
      } else {
        onSearch([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Verifica se há algum texto no campo de pesquisa
    if (inputValue.trim() !== '') {
      try {
        const response = await MovieApi.searchMovies(inputValue);
        if (response && response.results) {
          setSuggestions(response.results);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
      }
    } else {
      setSuggestions([]); // Limpa as sugestões se o campo de pesquisa estiver vazio
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      {/* Renderiza sugestões de filmes */}
      <ul>
        {suggestions.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
