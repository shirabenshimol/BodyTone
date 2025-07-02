import React from 'react';
import Header from './components/layout/Header';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LessonsPage from './components/LessonsPage/LessonsPage';
import Profile from './components/Profile/profile';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classes" element={<LessonsPage />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  </BrowserRouter>
);

export default App;
