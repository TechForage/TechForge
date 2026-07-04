import api from './api';

const authService = {
  // Register new user - Matches your Django backend
  register: async (userData) => {
    try {
      // Format data for your Django RegisterSerializer
      const payload = {
        name: userData.fullName,  // Your backend expects 'name'
        email: userData.email,
        password: userData.password,
      };

      console.log('Sending registration data:', payload);
      
      const response = await api.post('/register/', payload);
      console.log('Registration response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Registration API Error:', error);
      
      if (error.response) {
        const errorData = error.response.data;
        const formattedError = new Error();
        formattedError.response = error.response;
        formattedError.fieldErrors = errorData;
        formattedError.status = error.response.status;
        
        if (typeof errorData === 'object') {
          if (errorData.message) {
            formattedError.message = errorData.message;
          } else {
            const firstKey = Object.keys(errorData)[0];
            if (firstKey) {
              const msg = Array.isArray(errorData[firstKey]) 
                ? errorData[firstKey][0] 
                : errorData[firstKey];
              formattedError.message = msg;
            }
          }
        }
        
        throw formattedError;
      } else if (error.request) {
        throw new Error('No response from server. Please check if Django is running.');
      } else {
        throw new Error(error.message || 'Registration failed');
      }
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/login/', {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login API Error:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};

export default authService;