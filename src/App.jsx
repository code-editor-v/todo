import React, { useState, useEffect } from "react";
import { TodoProvider } from "./context";
import { LuListTodo } from "react-icons/lu";
import { TodoForm, TodoList } from "./components";
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);

  // Add Todo to array
  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev]);
  };

  const editTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id == id ? todo : prevTodo))
    );
  };

  //  Remove selected todo id from list
  const deleteTodo = (id) => {
    const isConfirmed = confirm("Do you want to delete ?");

    if (isConfirmed) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  // Set isCompleted to 0 or 1
  const toggleIsCompleted = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id == id
          ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
          : prevTodo
      )
    );
  };

  // Load todos from localStorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Save Todos in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ toggleIsCompleted, addTodo, editTodo, deleteTodo, todos }}
    >
      <div className="w-full min-h-screen bg-emerald-950 flex justify-center items-center bg-opacity-50 inset-0 overflow-hidden">
        <div className="bg-teal-600 p-6 rounded-lg shadow-lg shadow-emerald-700 w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square transition-all duration-500 ease-in-out">
          <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold flex gap-2 justify-center items-center text-center">
            Manage your Todos{" "}
            <LuListTodo className="cursor-pointer hover:shadow-md bg-slate-700 p-1.5 rounded-xl h-auto w-9" />
          </div>
          <TodoForm />

          <div className="h-[400px] overflow-y-auto mt-3 custom-scrollbar">
            {todos.map((todo) => (
              <TodoList key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
