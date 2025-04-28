import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useTodo } from "../context";

const TodoList = ({ todo }) => {
  const { toggleIsCompleted, editTodo, deleteTodo } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const handleToggle = () => {
    toggleIsCompleted(todo.id);
  };

  const updateTodo = () => {
    editTodo(todo.id, { ...todo, todo: todoMsg });
  };

  const enterSave = (e) => {
    if(e.key === "Enter"){
      updateTodo(e);
    }
  }

  return (
    <div className="bg-teal-100 p-3 rounded-lg shadow-lg max-w-2xl w-full mt-5">
      <div
        className={`flex items-center justify-between p-3 mb-3 bg-gray-50 rounded-lg shadow-md
        ${todo.isCompleted ? "bg-green-600" : "bg-gray-50"}
      `}
      >
        <input
          checked={todo.isCompleted}
          onChange={handleToggle}
          type="checkbox"
          className="mr-3"
        />

        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.isCompleted ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
          onKeyDown={enterSave}
        />

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (todo.isCompleted) return;

              if (isTodoEditable) {
                updateTodo();
              } else setIsTodoEditable((prev) => !prev);
            }}
            className="text-blue-500 hover:text-blue-700 bg-white p-1.5 rounded-2xl"
          >
            {isTodoEditable ? <FaSave /> : <FaEdit />}
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700 bg-white p-1.5 rounded-2xl"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
