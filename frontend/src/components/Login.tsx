import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom
import { AuthApi } from '../api/AuthApi';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Substituindo o useHistory pelo useNavigate

  const handleLogin = async () => {
    try {
      await AuthApi.login(username, password);
      // Redirecionar para a página principal após o login bem-sucedido
      navigate('/'); // Usando navigate para redirecionar
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container-login">
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
