import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity, attributes) => {
    setCart(prev => {
      // Logic for identical items (same id and same attributes)
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;
        
        // Stock validation
        if (newQuantity > product.stock) {
          alert(`No puedes agregar más de ${product.stock} unidades de este producto.`);
          return prev;
        }

        newCart[existingItemIndex].quantity = newQuantity;
        return newCart;
      }

      // Initial validation for new item
      if (quantity > product.stock) {
        alert(`No puedes agregar más de ${product.stock} unidades de este producto.`);
        return prev;
      }

      return [...prev, { ...product, quantity, selectedAttributes: attributes }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
