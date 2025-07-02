import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Link, Grid, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Registration failed');
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert('Registration successful!');
      navigate('/'); // ניתוב לדף הבית או לאן שתרצי
    } catch (error) {
      alert('Registration failed. Please check your input.');
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        color: 'white',
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#1e293b',
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#10b981', fontWeight: 'bold', textAlign: 'center' }}>
          Register to BodyTune
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="name"
                name="name"
                fullWidth
                required
                variant="filled"
                onChange={handleChange}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                name="email"
                fullWidth
                required
                variant="filled"
                onChange={handleChange}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                name="password"
                fullWidth
                required
                variant="filled"
                onChange={handleChange}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                variant="filled"
                onChange={handleChange}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Birth Date"
                name="birthDate"
                fullWidth
                variant="filled"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                variant="filled"
                onChange={handleChange}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#10b981',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#0ea971' }
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography>
                Already have an account?{' '}
                <Link href="/login" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                  Login here
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
