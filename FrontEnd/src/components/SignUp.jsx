import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Frontend validation
    if (!formData.firstName.trim()) {
      setError('First name is required');
      setIsLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please provide a valid email address');
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          isGoogleUser: false
        })
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('Error parsing response:', text);
        throw new Error('Invalid response from server');
      }

      if (response.ok) {
        alert('Account created successfully!');
        navigate('/signin');
      } else {
        setError(data.error || data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating your account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-5">
              <Shield className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold text-white">ThreatSense</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/signin" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign in
              </a>
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300/20 bg-white/5 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300/20 bg-white/5 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300/20 bg-white/5 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300/20 bg-white/5 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300/20 bg-white/5 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </form>

            {/* Terms and Privacy */}
            <p className="mt-4 text-xs text-gray-400 text-center">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 