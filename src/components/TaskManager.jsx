import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: uuidv4(),
      text: task,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.done;
    if (filter === "active") return !t.done;
    return true;
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // Example: "6/16/2025, 3:45 PM"
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Task Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 justify-center">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks</p>
        ) : (
          filteredTasks.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-1 px-4 py-2 bg-white dark:bg-gray-800 rounded shadow"
            >
              <div className="flex justify-between items-center">
                <span
                  onClick={() => toggleTask(t.id)}
                  className={`flex-1 cursor-pointer ${
                    t.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.text}
                </span>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
              <small className="text-sm text-gray-500 dark:text-gray-400">
                Created: {formatDate(t.createdAt)}
              </small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskManager;
