import "./App.css";
import ToDoList from "./components/ToDoList.jsx";
import Parse from "parse";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import ListPage from "./pages/ListPage.jsx";

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
    <BrowserRouter>
      <div className="main-inner">
        <Routes>
          <Route
            path="/"
            element={
              <ToDoList userID={user.id} userName={user.getUsername()} />
            }
          />

          <Route path="/lists/:listId" element={<ListPage />} />
        </Routes>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </BrowserRouter>
  );
}

export default App;
