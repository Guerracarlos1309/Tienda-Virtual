import { ShoppingCart, Store, Menu, User, Phone, Mail, Camera, Users, Share2, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = ({ onCartClick, onAdminClick, theme, onThemeToggle }) => {
  const { cartCount } = useCart();

  return (
    <div className="header-wrapper">
      <div className="top-bar">
        <div className="top-bar-content full-width">
          <div className="contact-info">
            <span><Phone size={14} /> +57 300 123 4567</span>
            <span><Mail size={14} /> contacto@tiendapremium.com</span>
          </div>
          <div className="top-nav">
            <a href="#">Ayuda</a>
            <a href="#">Rastreo</a>
            <a href="#">ES / USD</a>
          </div>
        </div>
      </div>
      
      <header className="header glass sticky">
        <div className="header-container full-width">
          <div className="logo" onClick={() => window.location.href = '/'}>
            <Store size={32} color="var(--primary)" />
            <div className="logo-text">
              <span className="brand-name">TIENDA <span className="blue-text">VIRTUAL</span></span>
              <span className="brand-tagline">PREMIUM SHOPPING</span>
            </div>
          </div>

          <nav className="nav">
            <a href="#ropa">Moda</a>
            <a href="#varios">Accesorios</a>
            <a href="#ofertas" className="hot-link">Ofertas</a>
            <a href="#contacto">Sobre Nosotros</a>
          </nav>

          <div className="actions">
            <div className="search-bar">
              <input type="text" placeholder="Buscar productos..." />
            </div>
            <div className="btn-group">
              <button className="theme-toggle" onClick={onThemeToggle} title="Cambiar Tema">
                {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </button>
              <button className="action-btn" onClick={onAdminClick} title="Admin">
                <User size={22} />
              </button>
              <button className="cart-btn" onClick={onCartClick} title="Carrito">
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
