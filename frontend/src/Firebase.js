// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_r1ki_r8VSPPXdznGQDNCHtGFKppV1Lw",
  authDomain: "resqnet-9aa32.firebaseapp.com",
  projectId: "resqnet-9aa32",
  storageBucket: "resqnet-9aa32.firebasestorage.app",
  messagingSenderId: "745201901073",
  appId: "1:745201901073:web:ba34a276bf2316e7371bb0",
  measurementId: "G-4VLB3LSVKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
