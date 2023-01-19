import React from 'react';
import SignInForm from '../../components/sign-in-form/SignInForm';
import SignupForm from '../../components/sign-up-form/SignupForm';

import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignupForm />
    </div>
  );
};

export default Authentication;
