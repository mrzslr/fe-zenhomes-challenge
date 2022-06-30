import { useEffect, useState, useMemo, FC } from 'react';
import useGetTodos from "./hooks/useGetTodos";
import TodoItem from "./components/TodoItem";
import Header from './components/Header';
import "./Todo.css";
import { Todo as TodoObject } from './model/Todo';
import { getSortingStrategy } from "./utils";

const Todo: FC = () => {
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<TodoObject[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const { data, error, isLoading } = useGetTodos(page);

  const onTodoCompletedCheckboxClicked = (idx: number) => {
    setTodos((curr: TodoObject[]) => {
      return curr.map((item: TodoObject, i: number) =>
        i === idx ? { ...item, completed: !item.completed } : item
      );
    });
  }

  const onAllTodosMarkedAsCompleted = (areAllTodosCompleted: boolean) => {
    setTodos(
      todos.map((todo: TodoObject) => ({
        ...todo,
        completed: !areAllTodosCompleted
      }))
    );
  }

  const onTodoSortChanged = (value: string) => {
    setSortValue(value)
  }

  const loadMore = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    if (!data) return;
    const updateTodos: TodoObject[] = todos.concat(data.results);
    setTodos(updateTodos);
  }, [data]);

  const sortedTodos: TodoObject[] = useMemo(() => {
    return getSortingStrategy(sortValue)(todos);
  }, [todos, sortValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="app">
      <Header
        todos={todos}
        data={data}
        sortValue={sortValue}
        onSortChange={onTodoSortChanged}
        onToggleAll={onAllTodosMarkedAsCompleted}
      />

      <div className="grid">
        {sortedTodos.map((todo, idx) => (
          <TodoItem
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