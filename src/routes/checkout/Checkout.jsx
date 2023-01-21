import React, { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';

import { CartContext } from '../../context/CartContext';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  if (cartItems.length === 0) {
    return <h2>No items in cart</h2>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className="total">Total: ${totalPrice}</span>
    </div>
  );
};

export default Checkout;
