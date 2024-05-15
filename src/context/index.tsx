import React, { createContext, useState, ReactNode, SetStateAction } from 'react';
import { useTodos } from '../hooks';
import { TodoItem } from '../components/Todos'
import { getAuth, User as FirebaseUser } from 'firebase/auth';

type SelectedDay = "today" | "previous 7 days" | "next 7 days" | "all days";

export interface TodoContextProps {
  selectedDay: SelectedDay;
  setselectedDay: (task: string) => void;
  todos: TodoItem[];
  selectedTodo: TodoItem | null;
  setSelectedTodo: React.Dispatch<SetStateAction<TodoItem | null>>;
  user: FirebaseUser | null;
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

interface TodoContextProviderProps {
  children: ReactNode;
  
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
  const defaultTask: SelectedDay = 'today';
  const [selectedDay, setselectedDay] = useState<SelectedDay>(defaultTask);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const auth = getAuth();
  const user = auth.currentUser; 


  const todos = useTodos()
  
  return (
    <TodoContext.Provider
      value={{
        selectedDay,
        setselectedDay: setselectedDay as (task:string) => void,
        todos,
        selectedTodo,
        setSelectedTodo,
        user
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

