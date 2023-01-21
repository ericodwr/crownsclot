import React, { useContext } from 'react';

import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

import { CartContext } from '../../context/CartContext';

import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  // getting the items on cartItems
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const navigate = useNavigate();

  // navigate to checkout page
  const goToCheckout = () => {
    navigate('/checkout');
    setIsCartOpen(false);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button onClick={goToCheckout}>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
