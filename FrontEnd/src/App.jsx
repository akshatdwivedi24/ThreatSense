import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
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
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
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
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
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
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
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