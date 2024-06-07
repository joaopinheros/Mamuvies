import axios from 'axios';

const BASE_URL = 'http://localhost:5000';  // Endereço do backend

export class MovieApi {
  static async searchMovies(query: string): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return null;
    }
  }

  static async getMovieDetails(movieId: number): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting movie details:', error);
      return null;
    }
  }

  static async rateMovie(movieId: number, rating: number): Promise<void> {
    try {
      const response = await axios.post(`${BASE_URL}/rate`, { movie_id: movieId, rating });
      console.log(response.data);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  }

  static async recommendMovies(): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/recommend`);
      return response.data;
    } catch (error) {
      console.error('Error getting recommended movies:', error);
      return null;
    }
  }
}
