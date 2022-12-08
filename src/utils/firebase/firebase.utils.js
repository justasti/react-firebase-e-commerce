import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDB-VBXto46ZYX9fNSFssS0Z4VlcChSUC0',
  authDomain: 'e-commerce-5e1d6.firebaseapp.com',
  projectId: 'e-commerce-5e1d6',
  storageBucket: 'e-commerce-5e1d6.appspot.com',
  messagingSenderId: '1007612238708',
  appId: '1:1007612238708:web:0901ca7207a0f023b66a21',
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log('an error occured creating a user');
      console.log(err);
    }
  }

  return userDocRef;
};
