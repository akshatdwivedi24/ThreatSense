import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Add the Google Sign In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: '64015883293-5m9mkrmhi4qfheo0jbssjecjkvkhcg38.apps.googleusercontent.com',
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { 
          theme: 'filled_blue',
          size: 'large',
          width: 280,
          text: 'continue_with'
        }
      );
    }
  };

  const handleGoogleSuccess = (response) => {
    const userObject = jwtDecode(response.credential);
    onLogin({
      name: userObject.name,
      email: userObject.email,
      picture: userObject.picture,
    });
    navigate('/');
  };

  const handleTraditionalSignIn = (e) => {
    e.preventDefault();
    // TODO: Implement traditional sign-in logic
    console.log('Traditional sign-in:', { email, password });
    onLogin({
      name: 'Test User',
      email: email,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-24 xl:pr-32 2xl:pr-40 text-center lg:text-left mb-8 lg:mb-0">
            <div className="w-full lg:max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 mb-4 lg:mb-8">
                <Shield className="h-6 sm:h-8 lg:h-16 w-6 sm:w-8 lg:w-16 text-indigo-500" />
                <span className="text-lg sm:text-xl lg:text-4xl font-bold text-white">ThreatSense</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 lg:mb-8 leading-tight">
                Real-time Threat Intelligence Platform
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-3 lg:mb-8 leading-tight">
                Advanced Threat Intelligence Platform
              </h2>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-16 2xl:pl-24">
            <div className="w-full max-w-[320px] sm:max-w-md mx-auto lg:mx-0">
              <div className="bg-white/10 backdrop-blur-lg py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-12 shadow-xl rounded-lg sm:rounded-xl">
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Google Sign In Button */}
                  <div className="flex justify-center">
                    <div id="googleSignInButton"></div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="bg-white/10 px-2 sm:px-3 text-gray-300">Or continue with</span>
                    </div>
                  </div>

                  {/* Traditional Sign In Form */}
                  <form className="space-y-2 sm:space-y-3 lg:space-y-6" onSubmit={handleTraditionalSignIn}>
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full appearance-none rounded-lg border border-gray-300/20 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 lg:py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full appearance-none rounded-lg border border-gray-300/20 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 lg:py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300/20 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-300">
                          Remember me
                        </label>
                      </div>

                      <div className="text-xs">
                        <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                          Forgot?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-lg bg-indigo-600 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>

                  <div className="text-center">
                    <p className="text-xs text-gray-300">
                      Don't have an account?{' '}
                      <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 