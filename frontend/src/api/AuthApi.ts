import axios from 'axios';

const BASE_URL = 'http://localhost:5000';  // Endereço do backend

export class AuthApi {
  static async login(username: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  static async register(username: string, password: string, name: string, preferences: string): Promise<void> {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { username, password, name, preferences });
      console.log(response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  }

  static async logout(): Promise<void> {
    try {
      const response = await axios.get(`${BASE_URL}/logout`);
      console.log(response.data);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
