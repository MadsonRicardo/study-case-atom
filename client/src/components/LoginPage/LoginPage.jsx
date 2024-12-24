import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                navigate('/dashboard');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
            setMessage('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <label htmlFor="email">E-mail </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="button" onClick={handleLogin}>Entrar</button>
            <p>{message}</p>
        </div>
    );
};

export default LoginPage;
