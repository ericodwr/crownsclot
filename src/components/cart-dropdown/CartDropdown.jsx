import React, { useContext } from 'react';

import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

import { CartContext } from '../../context/CartContext';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  // getting the items on cartItems
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))} 
      </div>
      <Button>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
