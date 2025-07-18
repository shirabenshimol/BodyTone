import React from 'react';
import Header from './components/layout/Header';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
const Login = React.lazy(() => import('./components/Auth/Login'));
const Register = React.lazy(() => import('./components/Auth/Register'));
const LessonsPage = React.lazy(() => import('./components/LessonsPage/LessonsPage'));
const MembershipPlans = React.lazy(() => import('./components/MembershipPlans/MembershipPlans'));
const Profile = React.lazy(() => import('./components/Profile/profile'));
const ProfileLayout = React.lazy(() => import('./components/Profile/ProfileLayout'));


const App = () => (
  <BrowserRouter>
    <Header />
    <Suspense fallback={
  <div style={{ color: '#10b981', textAlign: 'center', marginTop: '30vh', fontSize: '1.5rem' }}>
    Loading ...
  </div>
}>

    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/membershipPlans" element={<MembershipPlans />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classes" element={<LessonsPage />} />
      
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<Profile />} />
         
     </Route>
    </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
