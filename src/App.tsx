import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import User from './components/User';
import AddNewTodo from './components/AddNewTodo';
import Calendar from './components/Calendar';
import Todos from './components/Todos';
import EditTodo from './components/EditTodo';
import LoginPage from './pages/Login';
import { TodoContextProvider } from './context'; 

import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/index';

initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null); //Use union types for setUser
  useEffect(() => {
    const auth = getAuth(); // Download the Firebase authentication object

    // Check the user's authentication status
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        // User is logged in
        setUser(loggedInUser); // Set the user as the current user
      } else {
        //User is not logged in set user to null
        setUser(null); 
      }
    });

    // Pamiętaj o wyrejestrowaniu subskrypcji w celu zapobieżenia wyciekom pamięci
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={user ? <AppContent user={user}/> : <Navigate to="/login" />} /> 
        </Routes>
      </div>
    </Router>
  );
}

function AppContent({ user }: { user: FirebaseUser | null }) {
  return (
    <TodoContextProvider>
      <div className="app">
        <Sidebar>
          <User />
          <AddNewTodo />
          <Calendar />
        </Sidebar>
        <Main>
          <Todos />
          <EditTodo />
        </Main>
      </div>
    </TodoContextProvider>
  );
}

export default App;
