import React from "react";
import "./Header.css";

export const Header = ({
  todos,
  data,
  config,
  onToggleAll,
  sortValue,
  onSortChange
}) => {
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const areAllTodosCompleted = completedTodosCount === data?.results.length;

  const onChangeHandler = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="header">
      <span>
        Completed Todos {completedTodosCount} / {todos.length}
      </span>

      <div>
        <span className="header-sort_label">Sort by</span>
        <select
          className="header-sort_select"
          value={sortValue}
          onChange={(event) => onChangeHandler(event)}
        >
          <option value="">Default</option>
          <option value="title">Title</option>
          <option value="completed">Completed</option>
        </select>

        <span className="header-toggle_label">Complete all</span>

        <input
          type="checkbox"
          checked={areAllTodosCompleted}
          onChange={() => onToggleAll(areAllTodosCompleted)}
        />
      </div>
    </div>
  );
};
