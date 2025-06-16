import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TaskItem from "./TaskItem";

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const toggleTask = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const deleteTask = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const filteredTasks = tasks.filter((task) =>
    filter === "completed"
      ? task.completed
      : filter === "active"
      ? !task.completed
      : true
  );

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl mb-4 text-center dark:text-white">Task Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-2 py-1 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </div>

      <div className="flex justify-between mb-4">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={`px-2 py-1 rounded ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-gray-300 dark:divide-gray-600">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <li className="text-center text-gray-400 dark:text-gray-500">No tasks</li>
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
