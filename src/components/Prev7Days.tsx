import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Todo from './Todo';
import { TodoItem } from './Todos';

interface Previous7DaysProps {
  todos: TodoItem[];
}

const Previous7Days: FC<Previous7DaysProps> = ({ todos }) => {
  
      const days: string[] = ['0', '1', '2', '3', '4', '5', '6'];
      const today = moment().format('d');
      const sortedTodosByDay = days.map(day => {
        return {
          todos: todos.filter(todo => todo.day === day),
          number: day
        };
      });
  
      //ARRANGE DAYS
      const arrangeDays = sortedTodosByDay
        .slice(Number(today) + 1) // FROM THE NEXT DAY TO TODAY
        .concat(sortedTodosByDay.slice(0, Number(today) + 1)); // 'TODAY' AT THE END OF THE LIST
  
    return (
      <div className='Previous7Days'>
        {arrangeDays.map(day =>
          <div key={day.number}>
            <div className="day">
              <div className="name">
                {moment(day.number, 'd').format('dddd')}
                {day.number === moment().format('d') && '(Today)'}
              </div>
              <div className="total-todos">
                ( {day.todos.length} )
              </div>
            </div>
            <div className="todos">
              {day.todos.map(todo =>
                <Todo key={todo.id} todo={todo} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Previous7Days;
