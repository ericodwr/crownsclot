import React, { useContext } from 'react';

import { CartContext } from '../../context/CartContext';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  // get the toggle function to open cart and cart total
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const handleCart = () => {
    return setIsCartOpen((value) => !value);
  };
  return (
    <div className="cart-icon-container" onClick={handleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
