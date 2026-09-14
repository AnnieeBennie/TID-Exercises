import "./App.css";
import ToDoList from "./ToDoList.jsx";

function App() {
  const annasToDoList = [
    { id: "anna-1", text: "Call the landlord", done: false },
    { id: "anna-2", text: "Book the dentist", done: false },
  ];

  return (
    <div className="main-inner">
      <ToDoList firstName="Anna" todos={annasToDoList} />
      <ToDoList firstName="Anna" todos={annasToDoList} />
    </div>
  );
}

export default App;

//Exercise 1: add useState to manage the to-do lists for Anna and Konstantina
