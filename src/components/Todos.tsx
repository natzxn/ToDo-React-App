import React, { FC, useContext } from 'react';
import Todo from './Todo';
import Next7Days from './Next7Days';
import Prev7Days from './Prev7Days';
import { TodoContext, TodoContextProps } from '../context';
import moment from 'moment';


interface TodoItem {
    id: string;
    text: string;
    time: string;
    date: string;
    day: string;
    checked: boolean;
    color: string;
}

//CONTEXT
const Todos: FC = () => {
  const contextValue = useContext(TodoContext);
  if (!contextValue) {
    return null;
  }

  const { todos, selectedDay }: TodoContextProps = contextValue;
  //ACTUAL DAY AS INTEGER - USE FOR INDEX
  const today = parseInt(moment().format('d'), 10); 

    return (
        <div className='Todos'>
            <div className='selected-task'>
                {selectedDay}
            </div>
            <div className="todos">
            {selectedDay === "next 7 days" ?
          <Next7Days  
          todos={todos.filter((todo: TodoItem) => {
            const tomorrow = moment().add(1, 'day').startOf('day');
            const next7DaysWithoutToday = moment(tomorrow).add(7, 'days');
            const todoDate = moment(todo.date, 'DD/MM/YYYY');
            return todoDate.isBetween(tomorrow, next7DaysWithoutToday, undefined, '[]'); //FILTER NEXT 7 DAYS (WITHOUT 'TODAY')
          })}
          
          />
          :
          selectedDay === "previous 7 days" ?
          <Prev7Days  
          todos={todos.filter((todo:TodoItem) => {
            const previous7Days = moment().subtract(7, 'days').startOf('day');
            const todoDate = moment(todo.date, 'DD/MM/YYYY');
            return todoDate.isBetween(previous7Days, moment(), undefined, '[]'); //FILTER PREVIOUS 7 DAYS (WITH 'TODAY')
          })}
          
          />
          :
          todos.map((todo: TodoItem) =>
            selectedDay === "today" && parseInt(todo.day, 10) !== today ?
              null
              :
              <Todo todo={todo} key={todo.id} />  
                )
            } 
            </div>
        </div>
    ); //FILTER TODAY TODOS
}

export default Todos;
