// This page can be change later , its to show task Manager for adding and deleting
import TaskManager from "./components/TaskManager";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-purple-500 text-white"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
      <TaskManager />
    </div>
  );
}

export default App;
