import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Store,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import logo from "../assets/logo.png";
import "../styles/Header.css";

const Header = ({ onCartClick, onAdminClick, theme, onThemeToggle }) => {
  const { cartCount } = useCart();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        if (Array.isArray(res.data)) {
          setCategories(res.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="header-wrapper">
      <header className="header glass sticky">
        <div className="header-container full-width">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <div className="logo-text">
              <span className="brand-name">
                TIENDA <span className="blue-text">VIRTUAL</span>
              </span>
              <span className="brand-tagline">PREMIUM SHOPPING</span>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/">Inicio</Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/categoria/${cat.slug}`}>{cat.name}</Link>
            ))}
            <Link to="/sobre-nosotros">Nosotros</Link>
          </nav>

          <div className="actions">
            <div className="search-bar">
              <input type="text" placeholder="Buscar productos..." />
            </div>
            <div className="btn-group">
              <button
                className="theme-toggle"
                onClick={onThemeToggle}
                title="Cambiar Tema"
              >
                {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
              </button>
              <button
                className="action-btn"
                onClick={onAdminClick}
                title="Admin"
              >
                <User size={22} />
              </button>
              <button
                className="cart-btn"
                onClick={onCartClick}
                title="Carrito"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
