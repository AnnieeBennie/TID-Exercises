import { useState } from "react";

export default function NewListForm({ onAdd }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onAdd(name);

    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="New list"
      />

      <button id="add-btn" disabled={name.trim().length === 0}>
        New list
      </button>
    </form>
  );
}
