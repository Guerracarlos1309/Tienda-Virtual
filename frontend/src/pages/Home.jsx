import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Truck,
  ShieldCheck,
  Headphones,
  Zap,
  ChevronRight,
  ArrowRight,
  Camera,
  Users,
  Share2,
  Video,
  Send,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const clothingProducts = products.filter(
    (p) => p.type?.category?.name === "Moda",
  );
  const miscProducts = products.filter((p) => {
    if (p.type?.category?.name !== "Accesorios") return false;
    if (filterType === "All") return true;
    return p.type?.name === filterType;
  });

  const types = [
    "All",
    ...new Set(
      products
        .filter((p) => p.type?.category?.name === "Accesorios")
        .map((p) => p.type?.name),
    ),
  ];

  if (loading) return <div className="loading">Cargando Tienda...</div>;

  return (
    <div className="home-page">
      {/* Hero Section - High Density / Full Width */}
      <section className="hero-v2 full-width">
        <div className="hero-grid">
          <div className="hero-main glass animate-up">
            <span className="badge">Nueva Colección 2026</span>
            <h1>
              Liderando la <span className="blue-text">Moda Digital</span>
            </h1>
            <p>
              Explora miles de productos curados con la mejor calidad y precios
              competitivos.
            </p>
            <div className="hero-btns">
              <a href="#ropa" className="btn-primary">
                Ver Catálogo <ArrowRight size={18} />
              </a>
              <a href="#varios" className="btn-secondary">
                Más Vendidos
              </a>
            </div>
          </div>
          <div className="hero-side">
            <div
              className="side-card glass animate-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3>Oferta Flash</h3>
              <p>Hasta 50% de descuento en accesorios seleccionados.</p>
              <span className="timer">Finaliza en: 05:22:15</span>
            </div>
            <div
              className="side-card blue animate-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3>Envío Gratis</h3>
              <p>En todas tus compras superiores a $150.000.</p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="categories-strip full-width">
        <div className="section-header">
          <h2 className="section-title-alt">Explorar Categorías</h2>
          <a href="#" className="view-all">
            Ver todas <ChevronRight size={16} />
          </a>
        </div>
        <div className="categories-grid">
          {[
            "Camisetas",
            "Pantalones",
            "Calzado",
            "Relojes",
            "Gafas",
            "Bolsos",
          ].map((cat) => (
            <div key={cat} className="category-card glass">
              <div className="category-icon">{cat[0]}</div>
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="ropa" className="product-section full-width">
        <div className="section-header">
          <h2 className="section-title-alt">Moda Destacada</h2>
          <p className="section-subtitle">
            Descubre las últimas tendencias en vestuario masculino y femenino.
          </p>
        </div>
        <div className="product-grid">
          {clothingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="varios" className="product-section alternate full-width">
        <div className="section-header">
          <h2 className="section-title-alt">Accesorios y Más</h2>
          <div className="filter-tabs">
            {types.map((t) => (
              <button
                key={t}
                className={filterType === t ? "active" : ""}
                onClick={() => setFilterType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {miscProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
