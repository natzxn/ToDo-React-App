import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCaKr3qmo9DgcRi5Po1-QB16rgIcftw1mM",
  authDomain: "to-do-app-71eb1.firebaseapp.com",
  projectId: "to-do-app-71eb1",
  storageBucket: "to-do-app-71eb1.appspot.com",
  messagingSenderId: "275045947914",
  appId: "1:275045947914:web:150c65d3dd311f43a69df3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;
