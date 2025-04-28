import { useContext, createContext } from "react";

export const TodoContext = createContext({
  todos: [{ id: 1, todo: "Todo", isCompleted: false }],

  addTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  toggleIsCompleted: () => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
