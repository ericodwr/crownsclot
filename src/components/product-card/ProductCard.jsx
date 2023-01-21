import React, { useContext } from 'react';

// get function on CartContext
import { CartContext } from '../../context/CartContext';

import './product-card.styles.scss';

import Button from '../button/Button';

const ProductCard = ({ product }) => {
  // function to add item to cart
  const { addItemToCartItem } = useContext(CartContext);

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
        onClick={() => addItemToCartItem(product)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
