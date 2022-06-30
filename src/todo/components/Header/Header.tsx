import React from "react";
import "./Header.css";
import {Todo, TodosResponse} from '../../model/Todo';

interface Props {
  todos: Todo[];
  data: TodosResponse;
  sortValue: string;
  onToggleAll: (areAllTodosCompleted: boolean) => void;
  onSortChange: (sortValue: string) => void;
}

const Header: React.FC<Props> = ({
  todos,
  data,
  onToggleAll,
  sortValue,
  onSortChange
}) => {
  const completedTodosCount: number = todos.filter((todo: Todo) => todo.completed).length;
  const areAllTodosCompleted: boolean = completedTodosCount === data?.results.length;

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

export default Header;
