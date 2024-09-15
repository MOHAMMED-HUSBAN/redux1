import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, loadCart } from '../features/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch(loadCart(parsedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart'); // Reset localStorage to avoid further issues
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>
                Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
              </p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
