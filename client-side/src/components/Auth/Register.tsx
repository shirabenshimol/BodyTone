import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Link, Grid, Paper, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:8080";



const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: Yup.string().required('Phone is required'),
    birthDate: Yup.string().required('Birth date is required'),
    address: Yup.string().required('Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      birthDate: '',
      address: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Registration failed');

        const data = await response.json();
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!');
        setTimeout(() => navigate('/login'), 1000);
      } catch (error) {
        toast.error('Registration failed. Please check your input.');
      }
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"
      sx={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b)', color: 'white', p: 2 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 500, backgroundColor: '#1e293b', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#10b981', fontWeight: 'bold', textAlign: 'center' }}>
          Register to BodyTune
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone" },
              { name: "birthDate", label: "Birth Date", type: "date", shrink: true },
              { name: "address", label: "Address" }
            ].map((field, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  type={field.type || 'text'}
                  label={field.label}
                  name={field.name}
                  fullWidth
                  required
                  variant="filled"
                  value={(formik.values as any)[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputLabelProps={field.shrink ? { shrink: true } : undefined}
                  error={formik.touched[field.name as keyof typeof formik.touched] && Boolean(formik.errors[field.name as keyof typeof formik.errors])}
                  helperText={formik.touched[field.name as keyof typeof formik.touched] && formik.errors[field.name as keyof typeof formik.errors]}
                  sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                fullWidth
                required
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#10b981', fontWeight: 'bold', '&:hover': { backgroundColor: '#0ea971' } }}
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

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default RegisterPage;
