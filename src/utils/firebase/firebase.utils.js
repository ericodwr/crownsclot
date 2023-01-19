import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// function to create db
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3PfInrv_TqI_LLN-HZU3T0EWi1W5r_cs',
  authDomain: 'crownsclot-db.firebaseapp.com',
  projectId: 'crownsclot-db',
  storageBucket: 'crownsclot-db.appspot.com',
  messagingSenderId: '758892711785',
  appId: '1:758892711785:web:735fb806ab670f697fb7f8',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// create auth with google account
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// auth
export const auth = getAuth();

// google auth function
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// database
export const db = getFirestore();

// Create a new user to database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  // set user in database
  const userDocRef = doc(db, 'users', userAuth.uid);

  // console.log(userDocRef);

  // check user in database
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);

  // if user does not exist
  // set the document with the data from useAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // if user exist
  // return userAuth
  return userDocRef;
};

// email / password

// Create user by email/password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // check if email and password exist
  if (!email || !password) {
    return;
  }

  // returning function from firebase
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in by email / password
export const signInAuthWithEmailAndPassword = async (email, password) => {
  // check if email and password exist
  if (!email || !password) {
    return;
  }

  // returning function from firebase
  return await signInWithEmailAndPassword(auth, email, password);
};
