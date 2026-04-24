import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.attributes?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.attributes?.colors?.[0] || '');

  // Extract primary image or fallback
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
  const isClothing = product.type?.category?.name === 'Moda';

  const handleAddToCart = () => {
    const attributes = isClothing ? { size: selectedSize, color: selectedColor } : {};
    addToCart(product, quantity, attributes);
    setQuantity(1);
  };

  return (
    <div className="product-card glass animate-up">
      <div className="product-image">
        <img src={primaryImage} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
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
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
          </div>
          <button className="add-btn" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
