// src/App.jsx
import { useState } from "react";
import PostsApp from "./components/PostsApp";
import TaskApp from "./components/TaskApp";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [view, setView] = useState("posts"); // "posts" or "tasks"

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <nav className="flex gap-4 justify-center p-4 bg-gray-200 dark:bg-gray-800">
          <button onClick={() => setView("posts")} className="px-4 py-2 rounded bg-blue-500 text-white">
            Posts
          </button>
          <button onClick={() => setView("tasks")} className="px-4 py-2 rounded bg-green-500 text-white">
            Task Manager
          </button>
        </nav>

        {view === "posts" ? <PostsApp /> : <TaskApp />}
      </div>
    </ThemeProvider>
  );
}

export default App;
