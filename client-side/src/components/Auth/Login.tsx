import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/slices/userSlice';



interface LoginFormValues {
    email: string;
    password: string;
  }
  

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(4, 'Must be at least 4 characters').required('Required'),
    }),
    onSubmit: async (values: any) => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.code);

        dispatch(setUser({
          code: data.code,
          name: data.name,
          email: data.email,
          token: data.token,
          phone: data.phone,
          address: data.address,
          membership: data.membership,
          birthDate: data.birthDate,
          password:data.password,
          // age: data.birthDate ? calculateAge(data.birthDate) : undefined
        }));
        
        

        toast.success('Login successful!');
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
      }
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"
      sx={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b)' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, backgroundColor: '#1e293b', color: 'white' }}>
        <Typography variant="h5" mb={2} fontWeight="bold" color="#10b981">Login</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            variant="filled"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2, input: { color: 'white' }, label: { color: '#ccc' } }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            variant="filled"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 3, input: { color: 'white' }, label: { color: '#ccc' } }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#0ea971' } }}
          >
            Login
          </Button>

          <Typography mt={2} textAlign="center">
            Don't have an account?{' '}
            <Button variant="text" sx={{ color: '#10b981', fontWeight: 'bold' }}
              onClick={() => navigate('/register')}>
              Register here
            </Button>
          </Typography>
        </form>
      </Paper>

      <ToastContainer position="bottom-center" theme="dark" />
    </Box>
  );
};

export default Login;
function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}


