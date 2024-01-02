import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZb8dezOFCiyw5GtjdgS0UD7wvhdOEFqA",
  authDomain: "info3112backlog.firebaseapp.com",
  projectId: "info3112backlog",
  storageBucket: "info3112backlog.appspot.com",
  messagingSenderId: "408588599016",
  appId: "1:408588599016:web:9d82fdbddf1ba11190535d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {
  db,
  auth
};