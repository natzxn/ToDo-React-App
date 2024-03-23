import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // User logout
      window.location.reload(); //Reload page after logout
      navigate('/login'); // Navigate to Login Page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <a href="#" onClick={handleLogout}>Logout</a>
  );
}

export default Logout;
