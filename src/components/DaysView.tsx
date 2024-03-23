import React, { FC } from 'react';
import moment from 'moment';
import Todo from './Todo';
import { TodoItem } from './Todos';

interface DaysViewProps {
  todos: TodoItem[];
  viewType: 'next' | 'previous' | 'all' | 'today';
}

const DaysView: FC<DaysViewProps> = ({ todos, viewType }) => {
  const days: string[] = ['0', '1', '2', '3', '4', '5', '6'];
  const today = moment().format('d');

  const filterTodos = (todo: TodoItem) => {
    const todoDate = moment(todo.date);

    if (viewType === "next") {
      return todoDate.isBetween(
        moment().add(1, "day").startOf("day"),
        moment().add(8, "days").startOf("day"),
        undefined,
        "[]"
      );
    } else if (viewType === "previous") {
      return todoDate.isBetween(
        moment().subtract(7, "days").startOf("day"),
        moment().subtract(1, "day").endOf("day"),
        undefined,
        "(]"
      );
    } else if (viewType === "all") {
      return true;
    } else if (viewType === "today") {
      const todayStart = moment().startOf("day");
      return todoDate.isBetween(
        todayStart,
        todayStart.add(1, "day").startOf("day"),
        undefined,
        "[)"
      );
    }
    return false;
  };

  const sortedTodosByDay = days.map(day => {
    return {
      todos: todos.filter(todo => todo.day === day && filterTodos(todo)),
      number: day,
    };
  });

  let arrangeDays = sortedTodosByDay;

  if (viewType === 'next') {
    const todayIndex = days.indexOf(today);
    arrangeDays = [...arrangeDays.slice(todayIndex + 1), ...arrangeDays.slice(0, todayIndex + 1)];
  } else if (viewType === 'previous') {
    const todayIndex = days.indexOf(today);
    arrangeDays = [...arrangeDays.slice(todayIndex), ...arrangeDays.slice(0, todayIndex)];
  }

  arrangeDays.forEach(day => {
    day.todos.sort((a, b) => moment(b.date, 'DD/MM/YYYY').diff(moment(a.date, 'DD/MM/YYYY')));
  });

  return (
    <div className={viewType === 'next' ? 'Next7Days' : 'Previous7Days'}>
    {arrangeDays.map(day => (
      <div key={day.number}>
        <div className="day">
          <div className="name">
            {moment().day(day.number).format('dddd')}
            {day.number === today && viewType === 'next' && day.todos.length > 0 }
          </div>
          <div className="total-todos">( {day.todos.length} )</div>
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

export default DaysView;
