import React from 'react';

import { Outlet, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { signOutStart } from '../../store/user/user.action';

import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { useSelector } from 'react-redux';

import './navigation.styles.scss';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <span>
            {currentUser && (
              <span className="username">
                Hello, {currentUser.displayName}!
              </span>
            )}
          </span>
          <Link className="nav-link" to={'/shop'}>
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to={'/auth'}>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
