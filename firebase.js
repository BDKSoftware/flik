// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHZwhAtF_iDE_4gZjw3yLQRId7MEM9Q80",
  authDomain: "flik-d191c.firebaseapp.com",
  projectId: "flik-d191c",
  storageBucket: "flik-d191c.appspot.com",
  messagingSenderId: "787280490808",
  appId: "1:787280490808:web:50cde03a43bb17c11e51cd",
  measurementId: "G-CP0NC44H38",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function addDisplayName(user, displayName) {
  return updateProfile(user, {
    displayName: displayName,
  });
}

// TODO: SaveToAsyncStorage
// TODO: LOGIN WITH FACEBOOK
// TODO: LOGIN WITH GOOGLE
// TODO: SIGNUP WITH FACEBOOK
// TODO SIGNUP WITH GOOGLE
