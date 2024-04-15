import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { TodoItem } from '../components/Todos'; 
import { getAuth } from 'firebase/auth';

//useTodos collects todos from Firebase cloud
export function useTodos(): TodoItem[] {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return; 

    const db = getFirestore(firebase);
    const todosCollection = collection(db, 'todos');
    const userTodosQuery = query(todosCollection, where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(userTodosQuery, (snapshot) => {
      const data: TodoItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as TodoItem));
      setTodos(data);
    });

    return () => unsubscribe()
  }, [currentUser]); 

  return todos;
}
