import { SortValue } from "../model/SortValue";
import { Todo as TodoObject } from '../model/Todo';

const getSortingStrategy = (sortValue: string) => {
    switch (sortValue) {
        case SortValue.Title:
            return (todos: TodoObject[]): TodoObject[] => todos.sort((a: TodoObject, b: TodoObject) => a.name.title.localeCompare(b.name.title));
        case SortValue.Completed:
            return (todos: TodoObject[]): TodoObject[] => todos.sort((a: TodoObject, b: TodoObject) => (+b.completed || 0) - (+a.completed || 0));
        default:
            return (todos: TodoObject[]): TodoObject[] => todos.sort((a: TodoObject, b: TodoObject) => +b.id.name - +a.id.name);
    }
};

export { getSortingStrategy };