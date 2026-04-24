import React, { useState } from 'react';
import { X, Trash2, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  const generateWhatsAppMessage = () => {
    let message = `🚀 *NUEVO PEDIDO - TIENDA VIRTUAL*\n\n`;
    message += `👤 *Cliente:* ${customerInfo.firstName} ${customerInfo.lastName}\n`;
    message += `📞 *Teléfono:* ${customerInfo.phone}\n`;
    message += `📍 *Dirección:* ${customerInfo.address}\n\n`;
    message += `📦 *Productos:*\n`;
    
    cart.forEach(item => {
      const attrs = item.selectedAttributes ? Object.values(item.selectedAttributes).join(', ') : '';
      message += `- ${item.quantity}x ${item.name} ${attrs ? `(${attrs})` : ''} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *TOTAL:* $${cartTotal.toFixed(2)}\n\n`;
    message += `Favor confirmar recepción del pedido.`;
    
    return encodeURIComponent(message);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const orderData = {
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: `${customerInfo.phone}@whatsapp.com`, 
        phone: customerInfo.phone,
        address: customerInfo.address,
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
          attributes: item.selectedAttributes
        }))
      };

      await axios.post('http://localhost:5000/api/checkout', orderData);

      const waNumber = '584247842726'; 
      const waUrl = `https://wa.me/${waNumber}?text=${generateWhatsAppMessage()}`;
      window.open(waUrl, '_blank');

      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('Error in checkout:', error);
      setErrorMessage('Ocurrió un error al procesar tu pedido. Por favor, intenta de nuevo.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Tu Caja Virtual</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        {orderComplete ? (
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h3>¡Pedido Realizado!</h3>
            <p>Se ha enviado tu factura a WhatsApp.</p>
            <button className="btn-primary" onClick={() => { setOrderComplete(false); setShowCheckoutForm(false); onClose(); }}>Cerrar</button>
          </div>
        ) : showCheckoutForm ? (
          <form className="checkout-form animate-up" onSubmit={handleCheckout}>
            <h3>Datos de Entrega</h3>
            {errorMessage && <div className="error-message glass">{errorMessage}</div>}
            <div className="input-row">
              <div className="input-group">
                <label>Nombres</label>
                <input type="text" value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Apellidos</label>
                <input type="text" value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} required />
              </div>
            </div>
            <div className="input-group">
              <label>Número Telefónico (WhatsApp)</label>
              <input type="tel" placeholder="Ej: 58424..." value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Dirección de Envío</label>
              <textarea rows="3" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} required />
            </div>

            <div className="checkout-summary glass">
              <div className="total-row">
                <span>Total a Pagar:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowCheckoutForm(false)}>Volver al Carrito</button>
              <button type="submit" className="checkout-btn" disabled={isCheckingOut}>
                {isCheckingOut ? 'Procesando...' : 'Confirmar y Enviar WhatsApp'}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={64} />
                  <p>Tu caja está vacía</p>
                </div>
              ) : (
                cart.map((item, index) => {
                  const itemImage = item.images?.find(img => img.isPrimary)?.url || item.images?.[0]?.url;
                  return (
                    <div key={index} className="cart-item">
                      <img src={itemImage} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">${item.price} x {item.quantity}</p>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="total">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={() => setShowCheckoutForm(true)}>
                  <CreditCard size={20} /> Siguiente: Datos de Envío
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
