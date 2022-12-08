import React from 'react';
import Button from '../../components/button/button.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = (props) => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In page</h1>
      <Button buttonType='google' onClick={logGoogleUser}>
        Sign in with google pop up
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
