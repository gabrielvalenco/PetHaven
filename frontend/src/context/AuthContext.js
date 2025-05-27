import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in by loading from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      // Basic authentication with Django REST framework
      const response = await axios.post('/api/auth/login/', { username, password });
      const userData = response.data;
      
      // Store user in localStorage and context
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Token ${userData.token}`;
      
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/auth/register/', userData);
      return true;
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Remove user from localStorage and context
    localStorage.removeItem('user');
    setUser(null);
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
