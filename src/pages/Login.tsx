import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'

const LoginPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      // Login with Google Account
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // After successful login, redirect the user to the home page
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className={styles.LoginPage}>
      <div className={styles.box}>
        <div className={styles.btn}>
          <button className={styles.login} onClick={handleLogin}>
            <img src='https://cdn.iconscout.com/icon/free/png-256/free-google-152-189813.png' width="30" alt="login"></img> 
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;
