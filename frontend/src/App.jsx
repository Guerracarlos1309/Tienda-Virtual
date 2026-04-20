import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Header from './components/Header';
import Cart from './components/Cart';
import './styles/global.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <CartProvider>
      <Router>
        <div className="app">
          {/* Only show Header on non-admin routes or as needed */}
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={
              <>
                <Header 
                  onCartClick={() => setIsCartOpen(true)} 
                  onAdminClick={() => window.location.href = '/admin'}
                  theme={theme}
                  onThemeToggle={toggleTheme}
                />
                <Home />
                <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
