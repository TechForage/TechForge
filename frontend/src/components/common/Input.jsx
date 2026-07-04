import React from 'react';
import { FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  onIconClick,
  required,
  name,
  id,
  className = '',
  disabled = false,
  ...props
}) => {
  const IconComponent = icon === 'eye' ? FaEye : icon === 'eye-slash' ? FaEyeSlash : null;

  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg outline-none input-focus transition duration-200 ${
            icon ? 'pr-10' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        />
        {icon && IconComponent && (
          <button
            type="button"
            onClick={onIconClick}
            disabled={disabled}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition disabled:cursor-not-allowed"
          >
            <IconComponent />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1 error-shake">
          <FaExclamationCircle className="text-xs" /> {error}
        </p>
      )}
    </div>
  );
};

export default Input;