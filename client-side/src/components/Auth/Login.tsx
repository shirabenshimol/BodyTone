import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.code);
            
            alert('Login successful!');
            navigate("/");
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b)' }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, backgroundColor: '#1e293b', color: 'white' }}>
                <Typography variant="h5" mb={2} fontWeight="bold" color="#10b981">Login</Typography>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2, input: { color: 'white' }, label: { color: '#ccc' } }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3, input: { color: 'white' }, label: { color: '#ccc' } }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#0ea971' } }}
                    onClick={handleLogin}
                    
                >
                    Login
                </Button>
                <Typography mt={2} textAlign="center">
                    Don't have an account?{' '}
                    <Button variant="text" sx={{ color: '#10b981', fontWeight: 'bold' }} onClick={() => window.location.href = '/register'}>
                        Register here
                    </Button>
                </Typography>

            </Paper>
        </Box>
    );
};

export default Login;
