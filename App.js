import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask, login, register, getToken, clearToken } from "./api";
import AuthForm from "./AuthForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  useEffect(() => {
    if (!isLoggedIn) return;
    getTasks().then(setTasks).catch(() => {
      clearToken();
      setIsLoggedIn(false);
    });
  }, [isLoggedIn]);

  const handleAdd = async () => {
    if (newTask.trim() === "") return;
    const task = await addTask(newTask);
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleUpdate = async (task, changes) => {
    const updatedTask = { ...task, ...changes };
    await updateTask(task.id, changes); // Correct usage!
    setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    setTasks([]);
  };

  if (!isLoggedIn) {
    return <AuthForm onAuth={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      <h1>To-Do List</h1>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.marked_as_done}
              onChange={() => handleUpdate(task, { marked_as_done: !task.marked_as_done })}
            />
            <input
              value={task.title}
              onChange={e => handleUpdate(task, { title: e.target.value })}
            />
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;