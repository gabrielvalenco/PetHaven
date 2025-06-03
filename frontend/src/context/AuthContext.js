import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken, apiAuthPost, fetchCSRFToken } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load user from localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        // Note: We don't need to call setAuthToken here because
        // our api.js utility already initializes the token on load
      } catch (error) {
        // If there's a problem with the stored data, clear it
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        setUser(null);
        setAuthToken(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token and then use apiAuthPost utility for login
      await fetchCSRFToken();
      const result = await apiAuthPost('/auth/login/', { username, password });
      
      if (result.success) {
        const userData = result.data;
        console.log('Login successful:', userData);
        
        // Armazenar usuário no localStorage e contexto
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        // Definir cabeçalho de autorização padrão para requisições futuras
        setAuthToken(userData.token);
        
        return true;
      } else {
        const errorMsg = result.error?.non_field_errors?.[0] || 'Falha no login. Verifique suas credenciais.';
        console.error('Login error:', errorMsg);
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError('Erro inesperado ao tentar fazer login. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token and then use apiAuthPost utility for registration
      await fetchCSRFToken();
      const result = await apiAuthPost('/auth/register/', userData);
      
      if (result.success) {
        console.log('Registration successful');
        // Se quiser fazer login automático após o registro, descomente o código abaixo
        // const userData = result.data;
        // localStorage.setItem('user', JSON.stringify(userData));
        // setUser(userData);
        // setAuthToken(userData.token);
        return true;
      } else {
        // Extrai mensagens de erro da resposta
        let errorMessage = 'Falha no cadastro. Por favor, tente novamente.';
        if (result.error) {
          // Tentativa de formatar os erros de uma maneira mais amigável
          const errors = result.error;
          const errorMessages = [];
          
          Object.keys(errors).forEach(key => {
            if (Array.isArray(errors[key])) {
              errorMessages.push(`${key}: ${errors[key].join(', ')}`);
            } else {
              errorMessages.push(`${key}: ${errors[key]}`);
            }
          });
          
          if (errorMessages.length > 0) {
            errorMessage = errorMessages.join('\n');
          }
        }
        
        console.error('Registration error:', errorMessage);
        setError(errorMessage);
        return false;
      }
    } catch (err) {
      console.error('Unexpected registration error:', err);
      setError('Erro inesperado ao tentar fazer o cadastro. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint (if your backend has one)
      // await apiPost('/auth/logout/');
      
      // Remove user from localStorage
      localStorage.removeItem('user');
      setUser(null);
      
      // Clear auth headers
      setAuthToken(null);
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
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
