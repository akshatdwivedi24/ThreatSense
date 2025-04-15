import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ isAuthenticated, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-md'
    }`}>
      <div className="relative">
        {/* Animated border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo section */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-300" />
                  <Shield className="h-8 w-8 text-indigo-500 relative z-10" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  ThreatSense
                </span>
              </Link>
            </motion.div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <NavLink href="/features">Features</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                </>
              ) : (
                <>
                  <NavLink href="/features">Features</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                </>
              )}

              {/* Auth buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {user?.picture ? (
                    <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLogout}
                    className="relative px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                  >
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-sm" />
                    <span className="relative z-10">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-sm" />
                    <Link to="/signin" className="relative z-10">Sign In</Link>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-sm" />
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-indigo-400" />
              ) : (
                <Menu className="h-6 w-6 text-indigo-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-lg border-t border-gray-800"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                {isAuthenticated && (
                  <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
                )}
                <MobileNavLink href="/features">Features</MobileNavLink>
                <MobileNavLink href="/pricing">Pricing</MobileNavLink>
                <MobileNavLink href="/about">About</MobileNavLink>
                <MobileNavLink href="/contact">Contact</MobileNavLink>
                
                {isAuthenticated ? (
                  <div className="pt-4 flex flex-col space-y-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={onLogout}
                      className="w-full px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <div className="pt-4 flex flex-col space-y-2">
                    <Link to="/signin">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    to={href}
    className="relative text-gray-300 hover:text-white transition-colors group"
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
  </Link>
);

const MobileNavLink = ({ href, children }) => (
  <Link
    to={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
  >
    {children}
  </Link>
);

export default Navigation; 