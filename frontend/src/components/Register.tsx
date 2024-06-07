import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom
import { AuthApi } from '../api/AuthApi';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const navigate = useNavigate(); // Substituindo o useHistory pelo useNavigate

  const handleRegister = async () => {
    try {
      await AuthApi.register(username, password, name, preferences);
      // Redirecionar para a página de login após o registro bem-sucedido
      navigate('/login'); // Usando navigate para redirecionar
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Preferences:</label>
        <input type="text" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
