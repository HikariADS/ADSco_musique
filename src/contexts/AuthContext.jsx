import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Cấu hình axios
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Thêm interceptor để xử lý token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    const { token, user: newUser } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const updateProfile = async (userData) => {
    const response = await axios.put('/api/auth/profile', userData);
    const updatedUser = response.data;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axios.patch('/api/auth/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // Cập nhật avatar trong user local
    const updatedUser = { ...user, avatar: response.data.avatar };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    updateAvatar
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 