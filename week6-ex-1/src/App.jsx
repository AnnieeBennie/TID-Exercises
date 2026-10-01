import "./App.css";
import ToDoList from "./components/ToDoList.jsx";
import Parse from "parse";
import { useState } from "react";
import AuthPage from "./pages/AuthPage.jsx";

if (!import.meta.env.VITE_PARSE_APP_ID) {
  throw new Error("No parse credentials...");
}
Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
Parse.initialize(
  import.meta.env.VITE_PARSE_APP_ID,
  import.meta.env.VITE_PARSE_JS_KEY,
);

function App() {
  const [user, setUser] = useState(Parse.User.current());
  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }
  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }
  function handleLogout() {
    Parse.User.logOut().then(() => setUser(null));
  }
  return (
    <div className="main-inner">
      <ToDoList userID={user.id} userName={user.getUsername()} />
      <button onClick={handleLogout}>Logout </button>
    </div>
  );
}

export default App;
