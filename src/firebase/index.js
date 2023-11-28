// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOVKr-sriMB1qKKX0pADU_2TkTuxa2wDo",
  authDomain: "todo-app-4786a.firebaseapp.com",
  projectId: "todo-app-4786a",
  storageBucket: "todo-app-4786a.appspot.com",
  messagingSenderId: "1094215723228",
  appId: "1:1094215723228:web:36ae9578f81f9299c56c19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);


export const db = getFirestore(app);
