import { useState } from "react";

export default function NewTodoForm({ onAdd, list }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(text, list);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="New task"
      />
      <button id="add-btn" disabled={text.trim().length === 0}>
        Add
      </button>
    </form>
  );
}
