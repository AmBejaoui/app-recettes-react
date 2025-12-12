// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD517nwihsF2xvlHr9QO5mfT-de4noCiGU",
  authDomain: "app-recettes-react.firebaseapp.com",
  databaseURL: "https://app-recettes-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-recettes-react",
  storageBucket: "app-recettes-react.firebasestorage.app",
  messagingSenderId: "115747655426",
  appId: "1:115747655426:web:d0a53dacfeef55daca3c1b"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Realtime Database
export const database = getDatabase(app);