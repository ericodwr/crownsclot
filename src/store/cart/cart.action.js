import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

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

// toggle cart icon
export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART, bool);

// remove item from cart item
const removeCartItem = (cartItems, id) => {
  return cartItems.filter((item) => item.id !== id);
};

// function to add item to cart
export const addItemToCartItem = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems);
};

// function to decrease / move item in cart
export const decreaseTheCartItem = (cartItems, itemToRemove) => {
  const newCartItems = decreaseCartItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems);
};

// removing item from cart
export const remove = (cartItems, id) => {
  const newCartItems = removeCartItem(cartItems, id);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems);
};
