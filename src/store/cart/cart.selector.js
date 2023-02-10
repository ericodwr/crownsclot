import { createSelector } from 'reselect';

const selectCartRaducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartRaducer],
  (cart) => cart.cartItems,
);

export const selectIsCartOpen = createSelector(
  [selectCartRaducer],
  (cart) => cart.isCartOpen,
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, value) => acc + value.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, value) => acc + value.price * value.quantity, 0),
);
