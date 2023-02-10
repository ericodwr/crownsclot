import React from 'react';

import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useSelector, useDispatch } from 'react-redux';

import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  // getting the items on cartItems
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  // navigate to checkout page
  const goToCheckout = () => {
    navigate('/checkout');
    dispatch(setIsCartOpen(false));
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
