// Validation helpers
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[\d\s\-+()]{10,15}$/.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// Format error messages from Django backend
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  
  if (error?.fieldErrors) {
    const errors = error.fieldErrors;
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      const errorMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : errors[firstKey];
      return errorMsg;
    }
  }
  
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  
  return 'Something went wrong. Please try again.';
};

// Map Django field names to frontend field names
export const mapDjangoFieldErrors = (djangoErrors) => {
  const fieldMap = {
    'name': 'fullName',
    'email': 'email',
    'password': 'password',
    'non_field_errors': 'general',
  };
  
  const mappedErrors = {};
  
  Object.keys(djangoErrors).forEach((key) => {
    const frontendField = fieldMap[key] || key;
    const errorMessage = Array.isArray(djangoErrors[key]) 
      ? djangoErrors[key][0] 
      : djangoErrors[key];
    mappedErrors[frontendField] = errorMessage;
  });
  
  return mappedErrors;
};