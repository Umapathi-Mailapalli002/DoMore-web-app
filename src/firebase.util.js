import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA782i3M3bqy06EriPMM8JiWeQaX16FXt8",
  authDomain: "todoapp-fa54d.firebaseapp.com",
  projectId: "todoapp-fa54d",
  storageBucket: "todoapp-fa54d.appspot.com",
  messagingSenderId: "653058690630",
  appId: "1:653058690630:web:49824c3b621d5ecb4cc447",
  measurementId: "G-R9FXHK1TLK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, provider };