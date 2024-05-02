import React, { FC } from 'react';
import moment from 'moment';
import Todo from './Todo';
import { TodoItem } from './Todos';
import styles from '../styles/DaysView.module.css';

interface DaysViewProps {
  todos: TodoItem[];
  viewType: 'next' | 'previous';
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
    <nav className={viewType === 'next' ? styles.Next7Days : styles.Previous7Days}>
      {arrangeDays.map(day => (
        <div key={day.number}>
          <div className={styles.day}>
            <div className={styles.name}>
              {moment().day(day.number).format('dddd')}
            </div>
            <div className={styles.total}>( {day.todos.length} )</div>
          </div>
          <div className={styles.todos}>
            {day.todos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default DaysView;
