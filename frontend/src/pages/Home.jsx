import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Truck, ShieldCheck, Headphones, Zap, 
  ChevronRight, ArrowRight, Camera, 
  Users, Share2, Video, Send 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const clothingProducts = products.filter(p => p.category === 'ropa');
  const miscProducts = products.filter(p => {
    if (p.category !== 'varios') return false;
    if (filterType === 'All') return true;
    return p.type === filterType;
  });

  const types = ['All', ...new Set(products.filter(p => p.category === 'varios').map(p => p.type))];

  if (loading) return <div className="loading">Cargando Tienda...</div>;

  return (
    <div className="home-page">
      {/* Hero Section - High Density / Full Width */}
      <section className="hero-v2 full-width">
        <div className="hero-grid">
          <div className="hero-main glass animate-up">
            <span className="badge">Nueva Colección 2026</span>
            <h1>Liderando la <span className="blue-text">Moda Digital</span></h1>
            <p>Explora miles de productos curados con la mejor calidad y precios competitivos. Envío express a todo el país.</p>
            <div className="hero-btns">
              <a href="#ropa" className="btn-primary">Ver Catálogo <ArrowRight size={18} /></a>
              <a href="#varios" className="btn-secondary">Más Vendidos</a>
            </div>
          </div>
          <div className="hero-side">
            <div className="side-card glass animate-up" style={{ animationDelay: '0.2s' }}>
              <h3>Oferta Flash</h3>
              <p>Hasta 50% de descuento en accesorios seleccionados.</p>
              <span className="timer">Finaliza en: 05:22:15</span>
            </div>
            <div className="side-card blue animate-up" style={{ animationDelay: '0.3s' }}>
              <h3>Envío Gratis</h3>
              <p>En todas tus compras superiores a $150.000.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="features-strip full-width">
        <div className="features-grid">
          <div className="feature-item">
            <Truck size={32} />
            <div>
              <h4>Envío Veloz</h4>
              <p>Entregas en 24/48 horas</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={32} />
            <div>
              <h4>Pago Seguro</h4>
              <p>Protección 100% garantizada</p>
            </div>
          </div>
          <div className="feature-item">
            <Headphones size={32} />
            <div>
              <h4>Soporte 24/7</h4>
              <p>Chat en vivo siempre activo</p>
            </div>
          </div>
          <div className="feature-item">
            <Zap size={32} />
            <div>
              <h4>Garantía VIP</h4>
              <p>Devoluciones sin preguntas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-strip full-width">
        <div className="section-header">
          <h2 className="section-title-alt">Explorar Categorías</h2>
          <a href="#" className="view-all">Ver todas <ChevronRight size={16} /></a>
        </div>
        <div className="categories-grid">
          {['Camisetas', 'Pantalones', 'Calzado', 'Relojes', 'Gafas', 'Bolsos'].map(cat => (
            <div key={cat} className="category-card glass">
              <div className="category-icon">{cat[0]}</div>
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Clothing Section - High Density */}
      <section id="ropa" className="product-section full-width">
        <div className="section-header">
          <h2 className="section-title-alt">Moda Destacada</h2>
          <p className="section-subtitle">Descubre las últimas tendencias en vestuario masculino y femenino.</p>
        </div>
        <div className="product-grid">
          {clothingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section full-width">
        <div className="newsletter-card glass blue-gradient">
          <div className="newsletter-content">
            <h2>Únete al Club VIP</h2>
            <p>Suscríbete para recibir ofertas exclusivas, preventas y 10% de descuento en tu primera compra.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico..." />
              <button className="btn-primary">Suscribirme <Send size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Miscellaneous Section - High Density */}
      <section id="varios" className="product-section alternate full-width">
        <div className="section-header">
          <h2 className="section-title-alt">Accesorios y Más</h2>
          <div className="filter-tabs">
            {types.map(t => (
              <button 
                key={t} 
                className={filterType === t ? 'active' : ''}
                onClick={() => setFilterType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="product-grid">
          {miscProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer - Professional Multi-column */}
      <footer className="footer-v2 full-width">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-text">
              <span className="footer-brand-name">TIENDA <span className="blue-text">VIRTUAL</span></span>
              <p>Tu destino número uno para compras premium. Calidad, estilo y confianza en un solo lugar.</p>
            </div>
            <div className="social-links">
              <a href="#"><Camera /></a>
              <a href="#"><Users /></a>
              <a href="#"><Share2 /></a>
              <a href="#"><Video /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Compañía</h4>
            <nav>
              <a href="#">Sobre Nosotros</a>
              <a href="#">Carreras</a>
              <a href="#">Tiendas Físicas</a>
              <a href="#">Blog de Moda</a>
            </nav>
          </div>
          <div className="footer-links">
            <h4>Ayuda</h4>
            <nav>
              <a href="#">Centro de Ayuda</a>
              <a href="#">Términos de Uso</a>
              <a href="#">Política de Envío</a>
              <a href="#">Devoluciones</a>
            </nav>
          </div>
          <div className="footer-links">
            <h4>Contacto</h4>
            <address>
              <p>Calle Principal #123</p>
              <p>Ciudad de la Moda, CP 54321</p>
              <p>+57 300 123 4567</p>
              <p>soporte@tiendavirtual.com</p>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Tienda Virtual Premium. Todos los derechos reservados.</p>
          <div className="payment-methods">
            {/* Pay images or text */}
            <span>VISA</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>PSE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
