import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// function to create db
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

// database firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done');
};

// get database firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  const categories = querySnapShot.docs.map((docSnapshot) =>
    docSnapshot.data(),
  );
  // .reduce((acc, docSnapShot) => {
  //   const { title, items } = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, []);

  return categories;
};

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
  return userSnapshot;
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

// Sign Out User function
export const signOutUser = async () => signOut(auth);

// helper function tracking sign in/out
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
