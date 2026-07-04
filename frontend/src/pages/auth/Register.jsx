import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaStore, FaUserPlus, FaExclamationCircle } from 'react-icons/fa';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import { 
  validateEmail, 
  validatePhone, 
  validatePassword,
  mapDjangoFieldErrors,
  formatErrorMessage 
} from '../../utils/helpers';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(form.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const response = await register({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      
      console.log('Registration success:', response);
      
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please login.' 
        } 
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.fieldErrors) {
        const mappedErrors = mapDjangoFieldErrors(error.fieldErrors);
        setErrors(mappedErrors);
        if (mappedErrors.general) {
          setServerError(mappedErrors.general);
        }
      } else {
        setServerError(formatErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {loading && <Loader fullScreen />}
      
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white p-3 rounded-full shadow-md inline-flex items-center justify-center w-16 h-16">
              <FaStore className="text-2xl" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-1 text-sm text-gray-500">Join us and start shopping</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 card-transition border border-gray-100">
          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                <FaExclamationCircle className="mt-0.5 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              disabled={loading}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
              disabled={loading}
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              id="phone"
              placeholder="+1 234 567 890"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              disabled={loading}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              icon={showPassword ? 'eye-slash' : 'eye'}
              onIconClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            />

            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              icon={showConfirmPassword ? 'eye-slash' : 'eye'}
              onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
            />

            <div className="mb-5 flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: '' }));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={loading}
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                  Terms & Conditions
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-0 mb-3 text-sm text-red-500 flex items-center gap-1 error-shake">
                <FaExclamationCircle className="text-xs" /> {errors.terms}
              </p>
            )}

            <Button type="submit" loading={loading} disabled={loading}>
              <FaUserPlus className="mr-2" /> Create Account
            </Button>

            <div className="mt-5 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;