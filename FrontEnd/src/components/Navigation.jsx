import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Shield, LogIn, UserPlus, LogOut, User } from 'lucide-react';

const Navigation = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'IOC Search', href: '/search' },
    { name: 'Upload', href: '/upload' },
    { name: 'Analytics', href: '/analytics' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg' 
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-1.5 sm:space-x-2 text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform duration-200"
              >
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                  ThreatSense
                </span>
              </Link>
            </div>
            {isAuthenticated && (
              <div className="hidden sm:ml-4 lg:ml-8 sm:flex sm:space-x-3 lg:space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'
                    } transition-all duration-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:scale-105`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="hidden sm:ml-4 sm:flex sm:items-center sm:space-x-2 lg:space-x-4">
            {isAuthenticated ? (
              <>
                {/* User Profile */}
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-7 w-7 lg:h-8 lg:w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden lg:inline">
                    {user?.name}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-2 lg:px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 lg:h-5 lg:w-5 mr-1.5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                <Link
                  to="/signin"
                  className="inline-flex items-center px-2 lg:px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-200"
                >
                  <LogIn className="h-4 w-4 lg:h-5 lg:w-5 mr-1.5" />
                  <span className="hidden md:inline">Sign In</span>
                </Link>
              </>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 lg:h-6 lg:w-6 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="h-5 w-5 lg:h-6 lg:w-6 hover:-rotate-45 transition-transform duration-300" />
              )}
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700`}
      >
        <div className="pt-2 pb-3 space-y-1 px-3">
          {isAuthenticated && navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive(item.href)
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } block pl-3 pr-4 py-2.5 border-l-4 text-base font-medium transition-all duration-200`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              {/* Mobile User Profile */}
              <div className="flex items-center space-x-3 px-3 py-2.5">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name}
                </span>
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center pl-3 pr-4 py-2.5 border-l-4 border-transparent text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Mobile Sign In Button */}
              <Link
                to="/signin"
                className="flex items-center pl-3 pr-4 py-2.5 border-l-4 border-transparent text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 mr-3" />
                Sign In
              </Link>

              {/* Mobile Sign Up Button */}
              <Link
                to="/signup"
                className="flex items-center pl-3 pr-4 py-2.5 border-l-4 border-transparent text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="h-5 w-5 mr-3" />
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Dark Mode Toggle */}
          <div className="pl-3 pr-4 py-2.5 border-l-4 border-transparent">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenuOpen(false);
              }}
              className="flex items-center w-full text-gray-500 dark:text-gray-300"
            >
              {darkMode ? (
                <>
                  <Sun className="h-5 w-5 mr-3" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 mr-3" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 