import { useEffect, useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";

function loadTodos() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

export default function ToDoList({ firstName, todos }) {
  const [todoList, setTodoList] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  function handleAdd(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: text,
      done: false,
    };

    setTodoList([...todoList, newTodo]);
  }

  function handleToggle(id) {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleRemove(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-body">
      <h1>To Do List for {firstName}</h1>

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
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
