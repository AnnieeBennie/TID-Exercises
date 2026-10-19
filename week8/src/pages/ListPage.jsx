import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Parse from "parse";
import NewTodoForm from "../components/NewTodoForm.jsx";

import TodoItem from "../components/TodoItem.jsx";
import { fetchTodosForList, createTodo } from "../services/todoService.js";

const List = Parse.Object.extend("List");

export default function ListPage() {
  const { listId } = useParams();

  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const listQuery = new Parse.Query(List);
      const list = await listQuery.get(listId);

      const todos = await fetchTodosForList(list);

      setList(list);
      setTodos(todos);
    }

    load();
  }, [listId]);

  if (!list) {
    return <p>Loading...</p>;
  }
  async function handleAdd(newTask, list) {
    const created = await createTodo(newTask, list);
    setTodos([...todos, created]);
  }

  return (
    <div>
      <h1>{list.get("name")}</h1>

      <NewTodoForm list={list} onAdd={handleAdd} />

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
