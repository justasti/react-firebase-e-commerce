import React, { useState } from 'react';
import {
  creatAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const { user } = await creatAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('email is already in use!');
      }
      console.error('err', err.message);
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => {
      return { ...prevFields, [name]: value };
    });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={formSubmitHandler}>
        <FormInput
          label='Display name'
          type='text'
          required
          name='displayName'
          onChange={inputChangeHandler}
          value={displayName}
        />

        <FormInput
          label='Email address'
          type='email'
          required
          name='email'
          onChange={inputChangeHandler}
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          onChange={inputChangeHandler}
          value={password}
        />

        <FormInput
          label='Confirm password'
          type='password'
          required
          name='confirmPassword'
          onChange={inputChangeHandler}
          value={confirmPassword}
        />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
