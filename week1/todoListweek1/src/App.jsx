import "./App.css";
import ToDoList from "./ToDoList.jsx";
import Parse from "parse";
import { useState } from "react";
import AuthPage from "./pages/AuthPage.jsx";

Parse.initialize(
  "NQRBNG65tysLi8lBaYBL571QCq68522DQZuPVcLP", //appID
  "59wvSMXThKvuZb704q3F0bT8q5mRZjjxpyQcfso3", //JavascriptKey
);
Parse.serverURL = "https://parseapi.back4app.com"; //api url

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
