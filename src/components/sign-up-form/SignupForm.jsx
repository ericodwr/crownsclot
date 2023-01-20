import React, { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/Button';
import FormInput from '../form-input/FormInput';

import './signUpForm.styles.scss';

// Create default value form
const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = () => {
  // use state
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  // handle changing on form based on their values
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if password is same with the confirm one
    if (password !== confirmPassword) {
      alert('passwords do not match!');
      return;
    }

    // firebase
    try {
      // create user with email and password
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );

      // after create user, create database on firestore
      await createUserDocumentFromAuth(user, { displayName });

      // empty the form
      setFormFields(defaultFormField);

      // some error shit
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error' + error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display Name'}
          type={'text'}
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />
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
        <FormInput
          label={'Confirm Password'}
          type={'password'}
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignupForm;
