import React, { useContext, useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import moment from 'moment';
import firebase from '../firebase';
import { getFirestore, updateDoc ,doc } from 'firebase/firestore';


function EditTodo(): JSX.Element {
  // STATE
  const [text, setText] = useState<string>('');
  const [day, setDay] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());

  // CONTEXT
  const contextValue = useContext(TodoContext);
  const selectedTodo = contextValue?.selectedTodo;

  //EDIT TEXT DAY AND TIME 
  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, 'DD/MM/YYYY').toDate());
      setTime(moment(selectedTodo.time, 'HH:mm').toDate());
    }
  }, [selectedTodo]);

  //UPDATE THE DATA WHEN EDITING TODO
  useEffect(() => {
    if (selectedTodo) {
      const db = getFirestore(firebase);
      const todoRef = doc(db, 'todos', selectedTodo.id);
    
      updateDoc(todoRef, {
        text,
        date: moment(day).format('DD/MM/YYYY'), 
        day: moment(day).format('d'),
        time: moment(time).format('HH:mm')
      });
    }
  }, [text, day, time, selectedTodo]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    // Handle form submission
  }

  return (
    <div>
      {selectedTodo && (
        <div className='EditTodo'>
          <div className='header'><img width="25" height="25" src="https://img.icons8.com/office/25/pencil-tip.png" alt="pencil-tip"/> Edit Todo</div>
          <div className='container'>
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;