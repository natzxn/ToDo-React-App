import React, { FC, useContext, useState } from 'react';
import { getFirestore, deleteDoc, updateDoc ,doc } from 'firebase/firestore'
import firebase from '../firebase'
import moment from 'moment';
import { TodoContext, TodoContextProps } from '../context';
import { animated, useSpring } from '@react-spring/web';
import { TodoItem } from './Todos';
import styles from '../styles/Todo.module.css';

interface TodoProps {
  todo: TodoItem;
}

const Todo: FC<TodoProps> = ({ todo }) => {
  //STATE
  const [hover, setHover] = useState(false)

  //ANIMATION
  const fadeIn = useSpring({
    from : {marginTop : '-12px', opacity : 0},
    to : {marginTop : '0px', opacity : 1}
  })

  //CONTEXT
  const contextValue = useContext(TodoContext);
  if (!contextValue) {
    return null;
  }
  const { selectedTodo, setSelectedTodo }: TodoContextProps = contextValue;

  //HANDLE DELETE
  const handleDelete = async (todo: TodoProps['todo']) => {
  await deleteTodo(todo)
    if(selectedTodo === todo){
      setSelectedTodo(null)
    }
  }

  const deleteTodo = async (todo: TodoProps['todo']) => {
    const db = getFirestore(firebase);
    const todoRef = doc(db, 'todos', todo.id);

    try {
      await deleteDoc(todoRef);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  //CHECK TODO AS DONE
  const checkTodo = async (todo: TodoProps['todo']) => {
    const db = getFirestore(firebase);
    const todoRef = doc(db, 'todos', todo.id);

    try {
      await updateDoc(todoRef, {
        checked: !todo.checked
      });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const todoDate = moment(todo.date);
  const todayDate = moment();
  const isTaskDue = !todo.checked && todoDate.isBefore(todayDate) && !todayDate.isSame(todoDate, 'day');  //CHECK IF TASK HAS BEEN DONE OR NOT

  return (
    <animated.div style={fadeIn} className={`${styles.Todo} ${isTaskDue ? 'overdue' : ''}`}>
      <div
        className={styles.container}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {todo.checked ? (
            <span className='checked'>
              <img width="16" height="16" src="https://img.icons8.com/office/16/ok--v1.png" alt="ok--v1"/>
            </span>
          ) : (
            <span className="unchecked">
              {isTaskDue ? (
                <img width="16" height="16" src="https://img.icons8.com/ios-filled/16/FA5252/cancel.png" alt="x"/>
              ) : (
                <img width="16" height="16" src="https://img.icons8.com/ios-filled/16/circled.png" alt="circled"/>
              )}
            </span>
          )}
        </div>
        <div className={styles.text}
            onClick={() => setSelectedTodo(todo)}
            >
          <p style={{ color: todo.checked ? '#bebebe' : '#000000' }}>{todo.text}</p>
          <span>
            {moment(todo.date).format('DD/MM/YYYY')} - {moment(todo.time).format('HH:mm')}
          </span>

          <div className={`${styles.line} ${todo.checked ? styles["line-through"] : ""}`}></div>
        </div>
        <div className="delete-todo"
              onClick={() => handleDelete(todo)}
        >
          {(hover || todo.checked) && <span><img width="17" height="17" src="https://img.icons8.com/parakeet-line/17/trash.png" alt="trash"/></span>}
        </div>
      </div>
    </animated.div>
  );
};

export default Todo;
