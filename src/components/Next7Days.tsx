import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Todo from './Todo';
import { TodoItem } from './Todos';

interface WeekTodo {
  todos: TodoItem[];
  number: string;
}

interface Next7DaysProps {
  todos: TodoItem[];
}

const Next7Days: FC<Next7DaysProps> = ({ todos }) => {
    const [weekTodos, setWeekTodos] = useState<WeekTodo[]>([]);
  
    useEffect(() => {
      const days: string[] = ['0', '1', '2', '3', '4', '5', '6']; //INDEX AS WEEK DAY
  
      const sortedTodosByDay = days.map(day => {
        return {
          todos: todos.filter(todo => todo.day === day),
          number: day
        };
      });
   
      
      // ARRANGE DAYS
      const arrangeDays = sortedTodosByDay
      .slice(days.indexOf(moment().format('d')) + 1)
      .concat(sortedTodosByDay.slice(0, days.indexOf(moment().format('d')) + 1)); // 7 DAYS AHEAD FROM TOMORROW
      setWeekTodos(arrangeDays);
    }, [todos]);
  
    return (
      <div className='Next7Days'>
        {weekTodos.map(day => (
          <div key={day.number}>
            <div className="day">
              <div className="name">
                {moment(day.number, 'd').format('dddd')}
                {day.number === moment().format('d')}
              </div>
              <div className="total-todos">
                ( {day.todos.length} )
              </div>
            </div>
            <div className="todos">
              {day.todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

export default Next7Days;
