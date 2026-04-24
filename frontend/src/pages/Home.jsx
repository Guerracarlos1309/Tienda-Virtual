import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Truck,
  ShieldCheck,
  Headphones,
  Zap,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/categories"),
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando Tienda...</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-v2 full-width">
        <div className="hero-grid">
          <div className="hero-main glass animate-up">
            <span className="badge">Edición Limitada 2026</span>
            <h1>
              Explora Tu <span className="blue-text">Mejor Estilo</span>
            </h1>
            <p>
              Diseños exclusivos y calidad premium en cada detalle para tu día a día.
            </p>
            <div className="hero-btns">
              <a href="#catalogo" className="btn-primary">
                Comprar Ahora <ArrowRight size={18} />
              </a>
              {categories.length > 0 && (
                <Link to={`/categoria/${categories[0].slug}`} className="btn-secondary">
                  Explorar {categories[0].name}
                </Link>
              )}
            </div>
          </div>
          <div className="hero-side">
            <div className="side-card glass animate-up" style={{ animationDelay: "0.2s" }}>
              <h3>Envío Express</h3>
              <p>Compra hoy y recibe en tiempo récord.</p>
            </div>
            <div className="side-card blue animate-up" style={{ animationDelay: "0.3s" }}>
              <h3>Garantía Total</h3>
              <p>Satisfacción garantizada en todos los productos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="features-strip full-width">
        <div className="features-grid">
          <div className="feature-item">
            <Truck size={32} />
            <div><h4>Entrega Nacional</h4><p>Todo el país</p></div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={32} />
            <div><h4>Pago Seguro</h4><p>Pasarelas confiables</p></div>
          </div>
          <div className="feature-item">
            <Headphones size={32} />
            <div><h4>Soporte</h4><p>Atención personalizada</p></div>
          </div>
          <div className="feature-item">
            <Zap size={32} />
            <div><h4>Efectividad</h4><p>Procesos rápidos</p></div>
          </div>
        </div>
      </section>

      {/* Dynamic Category Sections */}
      <div id="catalogo">
        {categories.map((cat, idx) => {
          const catProducts = products.filter(p => p.type?.category?.id === cat.id).slice(0, 4);
          if (catProducts.length === 0) return null;
          
          return (
            <section key={cat.id} className={`product-section full-width ${idx % 2 !== 0 ? 'alternate' : ''}`}>
              <div className="section-header">
                <div>
                  <h2 className="section-title-alt">{cat.name}</h2>
                  <p className="section-subtitle">{cat.description}</p>
                </div>
                <Link to={`/categoria/${cat.slug}`} className="view-all">
                  Ver más {cat.name} <ChevronRight size={18} />
                </Link>
              </div>
              <div className="product-grid">
                {catProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
