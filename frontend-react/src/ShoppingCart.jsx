import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartStore';
import { useJwt } from './UserStore';
import axios from 'axios';

const ShoppingCart = () => {
  const { cart, getCartTotal, modifyQuantity, removeFromCart, setCartContent } = useCart();

  const { getJwt } = useJwt();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const isFirstRender = useRef(true); // Track first render

  const handleCheckout = async () => {
    const jwt = getJwt();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, {}, {
      // const response = await axios.post(`http://localhost:3000/api/checkout`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      // const { id: sessionId } = response.data;
      // window.location = `https://checkout.stripe.com/pay/${sessionId}`;
      const { url: sessionUrl } = response.data;
      window.location = `${sessionUrl}`;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const fetchCart = async () => {
    const jwt = getJwt();
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/api/cart', {
      // const response = await axios.get('http://localhost:3000/api/cart', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log('Cart:', response.data);
      setCartContent(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
    return ()=>{console.log('cleanup')}
  }, []);

  const updateCart = async () => {
    setIsUpdating(true);
    const jwt = getJwt();
    try {
      const updatedCart = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }));

      await axios.put(import.meta.env.VITE_API_URL + '/api/cart', { cartItems: updatedCart }, {
      // await axios.put('http://localhost:3000/api/cart', { cartItems: updatedCart }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip the first render
    }
    updateCart();
    return ()=>{console.log('cleanup')}
  }, [cart]);

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <img src={item.imageUrl} alt={item.productName} className="cart-image" />
                  <h5>{item.productName}</h5>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => modifyQuantity(item.product_id, item.quantity - 1)} disabled={isUpdating}>-</button>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => modifyQuantity(item.product_id, item.quantity + 1)} disabled={isUpdating}>+</button>
                    <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFromCart(item.product_id)} disabled={isUpdating}>Remove</button>
                  </div>
                </div>
                {item.discount === parseFloat(0) ? (
                  <>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </>
                ) : (
                  <>
                  <span>${(item.price * (1 - item.discount) * item.quantity).toFixed(2)}</span>
                  </>
                )}
                {/* <span>${(item.price * item.quantity).toFixed(2)}</span> */}
              </li>
            ))}
          </ul>
          <div className="mt-3 text-end">
            <h4>Total: ${getCartTotal()}</h4>
            <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
