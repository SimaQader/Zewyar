// firebase.js or similar file in your project
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByedEcJ3UZhft3_X6Yt9mpUFB8guVFEc4",
  authDomain: "zewyar-6f0e1.firebaseapp.com",
  projectId: "zewyar-6f0e1",
  storageBucket: "zewyar-6f0e1.appspot.com",
  messagingSenderId: "414119124024",
  appId: "1:414119124024:web:1fdeda13cc485d53599acd",
  // Add Android app ID if you're building for Android
  androidAppId: "1:414119124024:android:1fdeda13cc485d53599acd"
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Handle initialization error appropriately
}

// Initialize services with error handling
let db, storage, auth;
try {
  if (app) {
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
  }
} catch (error) {
  console.error('Error initializing Firebase services:', error);
  // Handle service initialization error appropriately
}

const firebase = {
  app,
  db,
  storage,
  auth,
  config: firebaseConfig
};

export { db, storage, auth };
export default firebase;