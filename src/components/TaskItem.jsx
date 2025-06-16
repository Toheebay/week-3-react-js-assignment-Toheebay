const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
      <li className="flex items-center justify-between p-2 border-b">
        <span
          onClick={() => onToggle(task.id)}
          className={`cursor-pointer flex-1 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </span>
        <button onClick={() => onDelete(task.id)} className="ml-4 text-red-500">
          ❌
        </button>
      </li>
    );
  };
  
  export default TaskItem;
  