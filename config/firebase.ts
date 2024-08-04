// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNZQp3HQGYKbo_a3-mXtewheulz2DDLEI",
  authDomain: "tsukishiro-a2243.firebaseapp.com",
  projectId: "tsukishiro-a2243",
  storageBucket: "tsukishiro-a2243.appspot.com",
  messagingSenderId: "873437553661",
  appId: "1:873437553661:web:2d31d8cece97af6488ef94",
  measurementId: "G-E8LLHVRLSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
