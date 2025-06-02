import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar se o usuário já está logado carregando do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Configurar o cabeçalho de autorização para requisições
      if (userData.token) {
        axios.defaults.headers.common['Authorization'] = `Token ${userData.token}`;
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      // Autenticação com token usando Django REST framework - URL completo para evitar problemas com o proxy
      const response = await axios.post('http://localhost:8000/api/auth/login/', { username, password });
      const userData = response.data;
      
      // Armazenar usuário no localStorage e contexto
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Definir cabeçalho de autorização padrão para requisições futuras
      axios.defaults.headers.common['Authorization'] = `Token ${userData.token}`;
      
      return true;
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Falha no login. Verifique suas credenciais.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Usar URL completo para evitar problemas com o proxy
      const response = await axios.post('http://localhost:8000/api/auth/register/', userData);
      // Se quiser fazer login automático após o registro, descomente o código abaixo
      // localStorage.setItem('user', JSON.stringify(response.data));
      // setUser(response.data);
      // axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      return true;
    } catch (err) {
      // Extrai mensagens de erro da resposta do Django REST
      let errorMessage = 'Falha no cadastro. Por favor, tente novamente.';
      if (err.response?.data) {
        // Tentativa de formatar os erros de uma maneira mais amigável
        const errors = err.response.data;
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
      
      setError(errorMessage);
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
