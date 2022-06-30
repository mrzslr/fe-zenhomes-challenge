import React from "react";
import useGetTodos from "./hooks/useGetTodos";
import TodoList from "./components/TodoList";
import Header from './components/Header';
import "./Todo.css";
import { SortValue } from "./model/SortValue";
import {Todo as TodoObject} from './model/Todo';

const getSortingStrategy = (sortValue: string) => {
  switch (sortValue) {
    case SortValue.Title:
      return (todos: TodoObject[]): TodoObject[] => todos.sort((a: TodoObject, b: TodoObject) => a.name.title.localeCompare(b.name.title));
    case SortValue.Completed:
      return (todos: TodoObject[]): TodoObject[] => todos.sort((a: TodoObject, b: TodoObject) => +b.completed - +a.completed);
    default:
      return (todos: TodoObject[]): TodoObject[] => todos.sort((a: TodoObject, b: TodoObject) => +a.id.name - +b.id.name);
  }
};

const Todo: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading } = useGetTodos(page);
  const [todos, setTodos] = React.useState<TodoObject[]>([]);
  const [sortValue, setSortValue] = React.useState<string>("");

  React.useEffect(() => {
    if (!data) return;
    const updateTodos: TodoObject[] = todos.concat(data.results);
    setTodos(updateTodos);
  }, [data]);

  const sortedTodos: TodoObject[] = React.useMemo(() => {
    return getSortingStrategy(sortValue)(todos);
  }, [todos, sortValue]);

  const onTodoCompletedCheckboxClicked = (idx: number) => {
    setTodos((curr: TodoObject[]) => {
      return curr.map((item, i) =>
        i === idx ? { ...item, completed: !item.completed } : item
      );
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const loadMore = () => {
    setPage(page + 1);
  }

  return (
    <div className="app">
      <Header
        todos={todos}
        data={data}
        sortValue={sortValue}
        onSortChange={(value) => setSortValue(value)}
        onToggleAll={(areAllTodosCompleted) => {
          setTodos(
            todos.map((todo) => ({
              ...todo,
              completed: !areAllTodosCompleted
            }))
          );
        }}
      />

      <div className="grid">
        {sortedTodos.map((todo, idx) => (
          <TodoList
            key={todo.login.uuid}
            todo={todo}
            isCompleted={todo.completed}
            onChange={() => onTodoCompletedCheckboxClicked(idx)}
          />
        ))}
      </div>

      <button className="todo_button__loadmore" onClick={loadMore}>Load More</button>
    </div>
  );
}

export default Todo;