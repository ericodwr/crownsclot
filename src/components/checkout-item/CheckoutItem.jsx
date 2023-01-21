import React, { useContext } from 'react';

import { CartContext } from '../../context/CartContext';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, id } = cartItem;

  const { remove, addItemToCartItem, decreaseTheCartItem } =
    useContext(CartContext);

  // set function for onClick
  const removeItem = () => remove(id);
  const addItemQuantity = () => addItemToCartItem(cartItem);
  const removeItemQuantity = () => decreaseTheCartItem(cartItem);

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
