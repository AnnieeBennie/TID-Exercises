import { useState } from "react";

export default function NewTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="New task"
      />
      <button disabled={text.trim().length === 0}>Add</button>
    </form>
  );
}
