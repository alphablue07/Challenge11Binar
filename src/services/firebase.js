import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsxrRFa7VzHOuqyPd9dzy9tQOlrexUJ80",
  authDomain: "binar-platinum-fsw26.firebaseapp.com",
  databaseURL: "https://binar-platinum-fsw26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "binar-platinum-fsw26",
  storageBucket: "binar-platinum-fsw26.appspot.com",
  messagingSenderId: "425031383335",
  appId: "1:425031383335:web:6936f2fdac7d77dc3dd102"
};

const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app);
  
