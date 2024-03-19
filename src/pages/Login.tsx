import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [loggedIn, setLoggedIn] = React.useState(false); // State that stores information about the user's login

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
      {/* Display the login button only if the user is not logged in */}
      {!loggedIn && (
        <button className='login' onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default LoginPage;
