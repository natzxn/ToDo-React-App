import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { TodoItem } from '../components/Todos'; 

//useTodos collects todos from Firebase cloud
export function useTodos(): TodoItem[] {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const db = collection(getFirestore(firebase), 'todos');

    const unsubscribe = onSnapshot(db, (snapshot) => {
      const data: TodoItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as TodoItem)); //doc.data() as TodoItem
      setTodos(data);
    });

    return () => unsubscribe()
  }, []); //empty array as second argument to render effect only once

  return todos;
}
