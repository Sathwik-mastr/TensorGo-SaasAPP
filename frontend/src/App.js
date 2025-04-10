import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import SuperAdminPanel from './pages/SuperAdminPanel';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Fail from './pages/Fail';
import Cart from './pages/Cart';

function App() {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = user && user.user?.email;

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} theme="colored" />

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {isAuthenticated && (
            <>
                          <Route path="/cart" element={<Cart />} />


              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard/success/:id" element={<Success />} />
              <Route path="/dashboard/fail" element={<Fail />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/superadmin" element={<SuperAdminPanel />} />
            </>
          )}

          {/* Redirect unauthorized access */}
          {!isAuthenticated && (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
