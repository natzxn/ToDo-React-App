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
  const [user, setUser] = useState<FirebaseUser | null>(null); 

  useEffect(() => {
    const auth = getAuth(); 

    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      } else {
        setUser(null); 
        localStorage.removeItem('user');
      }
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/" element={user ? <AppContent user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

function AppContent({ user }: { user: FirebaseUser }) {
  return (
    <TodoContextProvider>
      <div className="app-content">
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
