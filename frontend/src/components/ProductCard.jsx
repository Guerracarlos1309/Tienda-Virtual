import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.stock > 0 ? 1 : 0);
  const [selectedSize, setSelectedSize] = useState(product.attributes?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.attributes?.colors?.[0] || '');

  // Extract primary image or fallback
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
  const isClothing = product.type?.category?.name === 'Moda';

  const handleAddToCart = () => {
    const attributes = isClothing ? { size: selectedSize, color: selectedColor } : {};
    
    // Safety check just in case
    if (product.stock <= 0) {
      alert('Producto agotado');
      return;
    }

    addToCart(product, quantity, attributes);
    setQuantity(product.stock > 0 ? 1 : 0);
  };

  return (
    <div className="product-card glass animate-up">
      <div className="product-image">
        <img src={primaryImage} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="price-stock">
          <p className="price">${product.price}</p>
          {product.stock <= 0 ? (
            <span className="stock-badge out">Agotado</span>
          ) : product.stock <= 5 ? (
            <span className="stock-badge low">¡Últimas {product.stock} unidades!</span>
          ) : (
            <span className="stock-badge in">{product.stock} disponibles</span>
          )}
        </div>
        <p className="description">{product.description}</p>

        {isClothing && (
          <div className="attributes">
            <div className="attr-group">
              <label>Talla:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {product.attributes.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="attr-group">
              <label>Color:</label>
              <div className="color-options">
                {product.attributes.colors.map(c => (
                  <button 
                    key={c} 
                    className={`color-btn ${selectedColor === c ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.toLowerCase() === 'blanco' ? '#fff' : c.toLowerCase() === 'negro' ? '#000' : '#888' }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="card-footer">
          <div className="quantity-control">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={product.stock <= 0}
            >
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              disabled={product.stock <= 0 || quantity >= product.stock}
            >
              <Plus size={16} />
            </button>
          </div>
          <button 
            className="add-btn" 
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <ShoppingCart size={20} />
            {product.stock <= 0 ? 'Agotado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
