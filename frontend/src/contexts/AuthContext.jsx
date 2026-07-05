import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      // You can validate token or fetch user data here
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      // Your login API call here
      // const response = await api.post('/auth/login', { email, password });
      // const { token, userData } = response.data;
      // localStorage.setItem('authToken', token);
      // setUser(userData);
      
      // Mock login for now
      const mockUser = { id: 1, name: 'John Doe', email };
      localStorage.setItem('authToken', 'mock-token-123');
      setUser(mockUser);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      // Your registration API call here
      // const response = await api.post('/auth/register', userData);
      // const { token, user } = response.data;
      // localStorage.setItem('authToken', token);
      // setUser(user);
      
      // Mock registration for now
      const newUser = { id: Date.now(), ...userData };
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;