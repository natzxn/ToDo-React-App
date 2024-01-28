// context.tsx
import React, { createContext, useState, ReactNode, SetStateAction } from 'react';
import { useTodos } from '../hooks';

export interface TodoContextProps {
  selectedDay: string;
  setselectedDay: (task: string) => void;
  todos: any;
  selectedTodo: any;
  setSelectedTodo: React.Dispatch<SetStateAction<any>>;
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

interface TodoContextProviderProps {
  children: ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
  const defaultTask: string = 'today';
  const [selectedDay, setselectedDay] = useState<string>(defaultTask);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);

  const todos = useTodos()
  return (
    <TodoContext.Provider
      value={{
        selectedDay,
        setselectedDay,
        todos,
        selectedTodo,
        setSelectedTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

