import {
  ShoppingCart,
  Store,
  Menu,
  User,
  Phone,
  Mail,
  Camera,
  Users,
  Share2,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

const Header = ({ onCartClick, onAdminClick, theme, onThemeToggle }) => {
  const { cartCount } = useCart();

  return (
    <div className="header-wrapper">
      <header className="header glass sticky">
        <div className="header-container full-width">
          <Link to="/" className="logo">
            <Store size={32} color="var(--primary)" />
            <div className="logo-text">
              <span className="brand-name">
                TIENDA <span className="blue-text">VIRTUAL</span>
              </span>
              <span className="brand-tagline">PREMIUM SHOPPING</span>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/#ropa">Moda</Link>
            <Link to="/#varios">Accesorios</Link>
            <Link to="/#ofertas" className="hot-link">
              Ofertas
            </Link>
            <Link to="/sobre-nosotros">Sobre Nosotros</Link>
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
