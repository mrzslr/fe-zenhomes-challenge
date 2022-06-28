import React from "react";
import { useGetTodos } from "./http";
import { Header, Todo } from "./components";
import "./App.css";
var config = require("./config.json");

const getSortingStrategy = ({ sortValue }) => {
  switch (sortValue) {
    case "title":
      return (todos) => todos.sort((a, b) => a.title.localeCompare(b.title));
    case "completed":
      return (todos) => todos.sort((a, b) => a.completed - b.completed);
    default:
      return (todos) => todos.sort((a, b) => a.id - b.id);
  }
};

export default function App() {
  const { data, error, isLoading } = useGetTodos();
  const [todos, setTodos] = React.useState([]);
  const [sortValue, setSortValue] = React.useState("");

  React.useEffect(() => {
    if (!data) return;

    setTodos(data.results);
  }, [data]);

  const sortedTodos = React.useMemo(() => {
    return getSortingStrategy({ sortValue })(todos);
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
        config={config}
        sortValue={sortValue}
        onSortChange={setSortValue}
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
            onChange={() => {
              setTodos((curr) => {
                return curr.map((item, i) =>
                  i === idx ? { ...item, completed: !item.completed } : item
                );
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
