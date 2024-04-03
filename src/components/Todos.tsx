import React, { FC, useContext } from 'react';
import Todo from './Todo';
import DaysView from './DaysView';
import { TodoContext, TodoContextProps } from '../context';
import moment from 'moment';


export interface TodoItem {
    id: string;
    text: string;
    time: number;
    date: number;
    day: string;
    checked: boolean;
    color: string;
    userId: string;
}

//CONTEXT
const Todos: FC = () => {
  const contextValue = useContext(TodoContext);
  if (!contextValue) {
    return null;
  }

  const { todos, selectedDay }: TodoContextProps = contextValue;

  const filteredTodos = todos.filter((todo: TodoItem) => {
    if (!contextValue?.user) {
      return [];
    }
    return todo.userId === contextValue.user.uid;
  });
    

  return (
    <div className="Todos">
      <div className="selected-task">{selectedDay}</div>
      <div className="todos">
        {selectedDay === 'next 7 days' || selectedDay === 'previous 7 days' ? (
          <DaysView todos={filteredTodos} viewType={selectedDay === 'next 7 days' ? 'next' : 'previous'} />
        ) : selectedDay === 'all days' ? (
          filteredTodos.map((todo: TodoItem) => <Todo todo={todo} key={todo.id} />)
        ) : (
          filteredTodos.map((todo: TodoItem) =>
            selectedDay === 'today' &&
            moment(todo.date).isSame(moment(), 'day') ? (
              <Todo todo={todo} key={todo.id} />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default Todos;
