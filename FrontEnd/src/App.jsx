import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <HomePage 
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <Dashboard 
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        } 
      />
      <Route 
        path="/signin" 
        element={
          <SignIn 
            onLogin={handleLogin}
          />
        } 
      />
      <Route 
        path="/signup" 
        element={
          <SignUp />
        } 
      />
    </Routes>
  )
}

export default App 