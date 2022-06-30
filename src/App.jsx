import React from "react";
import { useGetTodos } from "./http";
import { Header, Todo } from "./components";
import "./App.css";
var config = require("./config.json");

const getSortingStrategy = ({ sortValue }) => {
  switch (sortValue) {
    case "title":
      return (todos) => todos.sort((a, b) => a.name.title.localeCompare(b.name.title));
    case "completed":
      return (todos) => todos.sort((a, b) => (b.completed | false) - (a.completed | false));
    default:
      return (todos) => todos.sort((a, b) => a.id.value - b.id.value);
  }
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading } = useGetTodos(page);
  const [todos, setTodos] = React.useState([]);
  const [sortValue, setSortValue] = React.useState("");

  React.useEffect(() => {
    if (!data) return;
    const updateTodos = todos.concat(data.results);
    setTodos(updateTodos);
  }, [data]);

  const sortedTodos = React.useMemo(() => {
    return getSortingStrategy({ sortValue })(todos);
  }, [todos, sortValue]);

  const onTodoCompletedCheckboxClicked = (idx) => {
    setTodos((curr) => {
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
        config={config}
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
          <Todo
            key={todo.login.uuid}
            todo={todo}
            config={config}
            isCompleted={todo.completed}
            onChange={() => onTodoCompletedCheckboxClicked(idx)}
          />
        ))}
      </div>

      <button className="todo_button__loadmore" onClick={loadMore}>Load More</button>
    </div>
  );
}
