import React from 'react';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCartItem } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import './product-card.styles.scss';

import Button from '../button/Button';

const ProductCard = ({ product }) => {
  // function to add item to cart
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={'inverted'}
        onClick={() => dispatch(addItemToCartItem(cartItems, product))}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
