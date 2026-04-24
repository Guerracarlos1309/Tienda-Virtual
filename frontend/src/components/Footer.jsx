import React from "react";
import { Link } from "react-router-dom";
import { Camera, Users, Share2, Video } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer-v2 full-width">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo-text">
            <span className="footer-brand-name">
              TIENDA <span className="blue-text">VIRTUAL</span>
            </span>
            <p>
              Tu destino número uno para compras premium. Calidad, estilo y
              confianza en un solo lugar.
            </p>
          </div>
          <div className="social-links">
            <a href="#">
              <Camera />
            </a>
            <a href="#">
              <Users />
            </a>
            <a href="#">
              <Share2 />
            </a>
            <a href="#">
              <Video />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Compañía</h4>
          <nav>
            <Link to="/sobre-nosotros">Sobre Nosotros</Link>
            <Link to="#">Carreras</Link>
            <Link to="#">Blog de Moda</Link>
          </nav>
        </div>
        <div className="footer-links">
          <h4>Ayuda</h4>
          <nav>
            <Link to="/ayuda">Centro de Ayuda</Link>
            <Link to="/terminos">Términos de Uso</Link>
            <Link to="/envios">Política de Envío</Link>
          </nav>
        </div>
        <div className="footer-links">
          <h4>Contacto</h4>
          <address>
            <p>Casa de Vivianne</p>
            <p>Ciudad de la Moda</p>
            <p>+5784247842726</p>
            <p>vivi@gmail.com</p>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2026 Tienda Virtual Premium. Todos los derechos reservados.
        </p>
        <div className="payment-methods">
          <span>VISA</span>
          <span>Mastercard</span>
          <span>PayPal</span>
          <span>PSE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
