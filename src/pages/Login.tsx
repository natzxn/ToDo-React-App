import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); 
  const [loggedIn, setLoggedIn] = React.useState(false); 

  const handleLogin = async () => {
    try {
      // Login with Google Account
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setLoggedIn(true);

      // After successful login, redirect the user to the home page
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className='LoginPage'>
      <div className='box'>
      {!loggedIn && (
        <button className='login' onClick={handleLogin}><img src='https://cdn.iconscout.com/icon/free/png-256/free-google-152-189813.png' width="30"></img> Login with Google</button>
      )}
      </div>
    </div>
  );
}

export default LoginPage;
