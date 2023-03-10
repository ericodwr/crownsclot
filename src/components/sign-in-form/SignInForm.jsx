import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

import Button from '../button/Button';
import FormInput from '../form-input/FormInput';

import './signInForm.styles.scss';

// Create default value form
const defaultFormField = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // dispatch
  const dispatch = useDispatch();

  // use state
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  // use context

  // handle changing on form based on their values
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // firebase
    try {
      dispatch(emailSignInStart(email, password));

      setFormFields(defaultFormField);

      // some error shit
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  // function for sign in from google
  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          type={'email'}
          value={email}
          name="email"
          required
          onChange={handleChange}
        />

        <FormInput
          label={'Password'}
          type={'password'}
          name="password"
          value={password}
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={'google'} onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
