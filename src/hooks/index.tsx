import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

interface Todo {
  id: string;
}

//useTodos collects todos from Firebase cloud
export function useTodos(): Todo[] {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const db = collection(getFirestore(firebase), 'todos');

    const unsubscribe = onSnapshot(db, (snapshot) => {
      const data: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return () => unsubscribe()
  }, []); //empty array as second argument to render effect only once

  return todos;
}
