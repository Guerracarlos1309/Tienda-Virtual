import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import '../styles/CategoryProducts.css';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/categories')
        ]);

        const currentCat = categoriesRes.data.find(c => c.slug === slug);
        setCategory(currentCat);

        if (currentCat) {
          // Filter products by category
          const filtered = productsRes.data.filter(p => p.type?.category?.id === currentCat.id);
          setProducts(filtered);
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="category-page full-width">
      <div className="breadcrumb">
        <Link to="/"><HomeIcon size={16} /> Inicio</Link>
        <ChevronRight size={16} />
        <span>{category?.name || 'Categoría'}</span>
      </div>

      <header className="category-header">
        <h1>{category?.name}</h1>
        <p>{category?.description}</p>
      </header>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <h3>No hay productos en esta categoría por ahora.</h3>
          <Link to="/" className="btn-primary">Ver todos los productos</Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
