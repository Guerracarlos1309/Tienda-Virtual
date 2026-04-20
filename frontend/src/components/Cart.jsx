import React, { useState } from 'react';
import { X, Trash2, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      // Mocking customer data for now
      const orderData = {
        customerName: 'Cliente Demo',
        customerEmail: 'cliente@ejemplo.com',
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
          attributes: item.selectedAttributes
        }))
      };

      await axios.post('http://localhost:5000/api/checkout', orderData);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('Error in checkout:', error);
      alert('Error al procesar el pedido. Asegúrate de que el backend esté corriendo.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar glass animate-up">
        <div className="cart-header">
          <h2>Tu Caja Virtual</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        {orderComplete ? (
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h3>¡Pedido Realizado!</h3>
            <p>Tu caja ha sido enviada al administrador.</p>
            <button className="btn-primary" onClick={() => { setOrderComplete(false); onClose(); }}>Cerrar</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={64} />
                  <p>Tu caja está vacía</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price} x {item.quantity}</p>
                      {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                        <div className="item-attrs">
                          {Object.entries(item.selectedAttributes).map(([key, val]) => (
                            <span key={key}>{val}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(index)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="total">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  className="checkout-btn" 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  <CreditCard size={20} />
                  {isCheckingOut ? 'Procesando...' : 'Finalizar Pedido'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
