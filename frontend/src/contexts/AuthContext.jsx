import React, { createContext, useState, useContext, useEffect } from 'react';
import api from "../config/api";
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

    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data.data;

    localStorage.setItem("authToken", token);

    setUser(user);

    return {
      success: true,
      user,
    };
  } catch (err) {
    const message =
      err.response?.data?.message || "Login failed";

    setError(message);

    return {
      success: false,
      error: message,
    };
  } finally {
    setLoading(false);
  }
};
 const register = async (userData) => {
  try {
    setLoading(true);
    setError(null);

    const response = await api.post("/api/auth/register", userData);

    const { user, token } = response.data.data;

    localStorage.setItem("authToken", token);

    setUser(user);

    return {
      success: true,
      user,
    };
  } catch (err) {
    const message =
      err.response?.data?.message || "Registration failed";

    setError(message);

    return {
      success: false,
      error: message,
    };
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