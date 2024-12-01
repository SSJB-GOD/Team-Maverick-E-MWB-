import React, { useContext, useState } from "react";
import GlobalContext from "../Dashboard/GlobalContext/GlobalContext";
import "./TaskManagementApp.css";
import "./TaskManagementstyles.css";
function TaskManagementApp() {
  const [tasks, setTasks] = useState([]);
  const { state } = useContext(GlobalContext);
  const [taskForm, setTaskForm] = useState({
    title: "",
    date: "",
    priority: "Low",
    reminder: "",
    id: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? taskForm : task
      );
      setTasks(updatedTasks);
      const StoreStatus = async () => {
        const response = await fetch("http://localhost:8085/api/updateTask", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: taskForm.id,
            userId: state.userid,
            title: taskForm.title,
            dueDate: taskForm.reminder + ":00",
            isCompleted: false,
            priority: taskForm.priority,
            createdAt: new Date().toISOString(),
          }),
        });
        // const data = await response.json();
      };
      StoreStatus();

      setEditingIndex(null);
    } else {
      const StoreStatus = async () => {
        const response = await fetch("http://localhost:8085/api/AddTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: state.userid,
            title: taskForm.title,
            dueDate: taskForm.reminder + ":00",
            isCompleted: false,
            priority: taskForm.priority,
            createdAt: new Date().toISOString(),
          }),
        });
        try {
          const data = await response.json();
          taskForm.id = data.response.body.id;
          console.log(data);
          setTasks([...tasks, taskForm]);
        } catch (err) {
          console.error("Error parsing response JSON:", err);
        }
      };
      StoreStatus();
    }
    setTaskForm({ title: "", date: "", priority: "Low", reminder: "", id: "" });
  };

  const handleEdit = (index) => {
    setTaskForm(tasks[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const TaskForm_dup = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    const StoreStatus = async () => {
      await fetch(`http://localhost:8085/api/${TaskForm_dup.id}`, {
        method: "DELETE",
      });
    };
    StoreStatus();
  };

  return (
    <div className="app-container">
      {/* <header className="header">
        <h1>Task Management System</h1>
      </header> */}
      <main>
        <form id="task-form" className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Task Title"
            value={taskForm.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            id="date"
            value={taskForm.date}
            onChange={handleChange}
            required
          />
          <select
            id="priority"
            value={taskForm.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="datetime-local"
            id="reminder"
            value={taskForm.reminder}
            onChange={handleChange}
          />
          <button type="submit">
            {editingIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
        <div id="task-list" className="task-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <h3>{task.title}</h3>
              <p className="task-date">Due: {task.date} &nbsp;</p>
              <p className="task-priority">Priority: {task.priority}</p>
              <p className="task-reminder">
                {task.reminder ? `Reminder: ${task.reminder}` : ""}
              </p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TaskManagementApp;
