import { createContext, useState, useEffect } from 'react';

// helper function for adding item or create a new item for input to the cart
const addCartItem = (cartItems, productToAdd) => {
  // check if item already added or not
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  // adding the quantity if item already in cart
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  // if not create the item and add the quantity
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// helper function to decrease or remove quantity below 1
const decreaseCartItem = (cartItems, itemToRemove) => {
  // check if item already added or not
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id,
  );

  // remove if quantity below 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== itemToRemove.id);
  }

  // returning new data with decreased cartItem quantity
  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...itemToRemove, quantity: itemToRemove.quantity - 1 }
      : item,
  );
};

// remove item from cart item
const removeCartItem = (cartItems, id) => {
  return cartItems.filter((item) => item.id !== id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartitems: [],
  addItemToCartItem: () => {},
  setCartItems: () => {},
  decreaseTheCartItem: () => {},
  cartCount: 0,
  totalPrice: 0,
  remove: () => {},
});

export const CartProvider = ({ children }) => {
  // state on cart context
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // watching if cartItem did some changes then update cart
  useEffect(() => {
    const totalCart = cartItems.reduce((acc, value) => acc + value.quantity, 0);

    const totalPrice = cartItems.reduce(
      (acc, value) => acc + value.price * value.quantity,
      0,
    );

    setTotalPrice(totalPrice);
    setCartCount(totalCart);
  }, [cartItems]);

  // function to add item to cart
  const addItemToCartItem = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // function to decrease / move item in cart
  const decreaseTheCartItem = (itemToRemove) => {
    setCartItems(decreaseCartItem(cartItems, itemToRemove));
  };

  // removing item from cart
  const remove = (id) => {
    setCartItems(removeCartItem(cartItems, id));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCartItem,
    decreaseTheCartItem,
    cartItems,
    cartCount,
    totalPrice,
    remove,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
