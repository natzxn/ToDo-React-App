import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Logout = () => {
  const navigate = useNavigate(); // Inicjalizacja hooka useNavigate

  const handleLogout = async () => {
    try {
      await signOut(auth); // Wylogowanie użytkownika
      window.location.reload(); // Odśwież stronę automatycznie po wylogowaniu się
      navigate('/login'); // Przekierowanie na stronę logowania
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <a href="#" onClick={handleLogout}>Logout</a>
  );
}

export default Logout;
