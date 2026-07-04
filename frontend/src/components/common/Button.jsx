import React from 'react';

const Button = ({ 
  children, 
  loading, 
  disabled, 
  onClick, 
  fullWidth = true, 
  variant = 'primary',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'py-3 px-4 font-semibold rounded-lg btn-hover transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          <span>Creating...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;