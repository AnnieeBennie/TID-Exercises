import { useEffect, useState } from "react";
import Parse from "parse";
import NewTodoForm from "./NewTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import NewListForm from "./NewListForm.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
  fetchTodosForList,
} from "../services/todoService.js";

import { createList, fetchLists } from "../services/listService.js";

export default function ToDoList({ userID, userName }) {
  const [todoList, setTodoList] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function load() {
      const allLists = await fetchLists();
      setLists(allLists);

      const allTodos = [];

      for (const list of allLists) {
        const todos = await fetchTodosForList(list);
        allTodos.push(...todos);
      }

      setTodoList(allTodos);
    }
    load();
  }, [userID]);

  async function handleAdd(newTask, list) {
    const created = await createTodo(newTask, list);
    setTodoList([...todoList, created]);
  }

  async function handleAddList(name) {
    const created = await createList(name);
    setLists([...lists, created]);
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

      <NewListForm onAdd={handleAddList} />
      {lists.length === 0 ? (
        <p>No lists yet.</p>
      ) : (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <h2>{list.get("name")}</h2>

              <NewTodoForm list={list} onAdd={handleAdd} />

              <ul>
                {todoList
                  .filter((todo) => todo.list === list.id)
                  .map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggle}
                      onRemove={handleDelete}
                    />
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
