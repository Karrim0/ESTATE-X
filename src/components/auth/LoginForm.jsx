// src/components/auth/LoginForm.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validateLoginForm } from '../../utils/validation';
import { getRedirectAfterLogin } from '../../utils/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateLoginForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsLoading(true);
    setServerError('');
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect after successful login
        const redirectUrl = getRedirectAfterLogin();
        navigate(redirectUrl);
      } else {
        setServerError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login
  const handleDemoLogin = async (role) => {
    const demoCredentials = {
      buyer: { email: 'john.smith@example.com', password: 'password123' },
      agent: { email: 'sarah.johnson@realty.com', password: 'password123' },
      admin: { email: 'admin@estatepro.com', password: 'admin123' }
    };
    
    const creds = demoCredentials[role];
    setFormData(creds);
    
    setIsLoading(true);
    const result = await login(creds.email, creds.password);
    setIsLoading(false);
    
    if (result.success) {
      navigate(getRedirectAfterLogin());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your Estate PRO account</p>
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-in slide-in-from-top">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-medium">{serverError}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={20} className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <LogIn size={20} />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Demo Accounts */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">Quick Demo Login</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={() => handleDemoLogin('buyer')}
            disabled={isLoading}
            className="py-2 px-3 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 border-2 border-blue-200"
          >
            Buyer
          </button>
          <button
            onClick={() => handleDemoLogin('agent')}
            disabled={isLoading}
            className="py-2 px-3 bg-green-50 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 border-2 border-green-200"
          >
            Agent
          </button>
          <button
            onClick={() => handleDemoLogin('admin')}
            disabled={isLoading}
            className="py-2 px-3 bg-purple-50 text-purple-700 text-sm font-semibold rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 border-2 border-purple-200"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create one now
        </Link>
      </p>

      {/* Social Login (Optional) */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="py-3 px-4 border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="py-3 px-4 border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;