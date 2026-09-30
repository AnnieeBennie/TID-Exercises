import { useEffect, useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "../services/todoService.js";

export default function ToDoList({ userID, userName }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function load() {
      const allTodos = await fetchTodos();
      setTodoList(allTodos.filter((todo) => todo.user === userID));
    }
    load();
  }, [userID]);

  async function handleAdd(newTask) {
    const created = await createTodo(newTask);
    setTodoList([...todoList, created]);
  }

  async function handleDelete(idToDelete) {
    await deleteTodo(idToDelete);
    setTodoList(todoList.filter((each) => each.id !== idToDelete));
  }

  async function handleToggle(id) {
    const todo = todoList.find((t) => t.id == id);
    await setTodoDone(id, !todo.done);
    setTodoList(
      todoList.map((t) => (t.id == id ? { ...t, done: !t.done } : t)),
    );
  }

  return (
    <div className="todo-body">
      <h1>To Do List for {userName}</h1>

      <NewTodoForm onAdd={handleAdd} />

      {todoList.length === 0 ? (
        <p>Nothing to do. Enjoy the afternoon.</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onRemove={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
