import React, { useState } from "react";
import { useTodo } from "../context";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();

  const handleAdd = (e) => {
    e.preventDefault();

    if (!todo) return;
    addTodo({ id: Date.now(), todo: todo, isCompleted: false });
    setTodo("");
  };

  const handleAddKey = (e) => {
    if (e.key === "Enter") {
      handleAdd(e);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-xl mt-5">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleAddKey}
          placeholder="Enter your todo"
          className="w-full sm:w-84 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          onClick={handleAdd}
          className="w-full sm:w-auto p-3 lg:px-4 bg-teal-950 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
