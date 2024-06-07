import React from 'react';

interface MovieListProps {
  movies: any[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div>
      {movies.map((movie: any) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          <p>Director: {movie.director}</p>
          <p>Genres: {movie.genres.join(', ')}</p>
          <p>{movie.overview}</p>
          <p>Vote Average: {movie.vote_average}</p>
          {movie.poster_path && <img src={movie.poster_path} alt={movie.title} />}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
