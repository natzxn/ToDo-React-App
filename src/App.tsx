import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import User from './components/User';
import AddNewTodo from './components/AddNewTodo';
import Calendar from './components/Calendar';
import Todos from './components/Todos';
import EditTodo from './components/EditTodo';


function App() {
  return (
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
  );
}

export default App;
