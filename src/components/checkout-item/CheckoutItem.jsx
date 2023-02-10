import React from 'react';

import {
  remove,
  addItemToCartItem,
  decreaseTheCartItem,
} from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, id } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // set function for onClick
  const removeItem = () => dispatch(remove(cartItems, id));
  const addItemQuantity = () =>
    dispatch(addItemToCartItem(cartItems, cartItem));
  const removeItemQuantity = () =>
    dispatch(decreaseTheCartItem(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={removeItemQuantity}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemQuantity}>
          &#10095;
        </div>
      </div>
      <span className="price">{price}</span>
      <div onClick={removeItem} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
