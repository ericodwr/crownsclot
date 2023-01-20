import React, { useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
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
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
