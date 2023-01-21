import { createContext, useState, useEffect } from 'react';

// helper function for adding item or create a new item for input to the cart
const addCartItem = (cartItems, productToAdd) => {
  // check if item already added or not
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id == productToAdd.id,
  );

  // adding the quantity if item already in cart
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id == productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  // if not create the item and add the quantity
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartitems: [],
  addItemToCartItem: () => {},
  setCartItems: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  // state on cart context
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // watching if cartItem did some changes then update total cart
  useEffect(() => {
    const totalCart = cartItems.reduce((acc, value) => acc + value.quantity, 0);

    setCartCount(totalCart);
  }, [cartItems]);

  // function to add item to cart
  const addItemToCartItem = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCartItem,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
