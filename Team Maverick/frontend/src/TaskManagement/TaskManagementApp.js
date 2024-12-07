import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../Dashboard/GlobalContext/GlobalContext";
import "./TaskManagementApp.css";
import "./TaskManagementstyles.css";

function TaskManagementApp() {
  const [tasks, setTasks] = useState([]);
  const { state } = useContext(GlobalContext);
  const [taskForm, setTaskForm] = useState({
    title: "",
    priority: "High",
    reminder: "",
    id: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showAlert, setShowAlert] = useState({ type: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8085/api/${state.userid}`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [state.userid]);

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTaskId ? "updateTask" : "addTask";
      const method = editingTaskId ? "PUT" : "POST";
      const response = await fetch(`http://localhost:8085/api/${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskForm.id || null,
          userId: state.userid,
          title: taskForm.title,
          dueDate: taskForm.reminder + ":00",
          priority: taskForm.priority,
        }),
      });

      if (!response.ok) throw new Error("Failed to process task");

      const updatedTask = await response.json();
      if (editingTaskId) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTaskId
              ? { ...task, ...taskForm, dueDate: taskForm.reminder + ":00" }
              : task
          )
        );
        setEditingTaskId(null);
      } else {
        setTasks([...tasks, updatedTask]);
      }

      setTaskForm({ title: "", priority: "High", reminder: "", id: "" });
      setShowAlert({ type: "success", message: "Task updated successfully!" });
    } catch (error) {
      console.error("Error submitting task:", error);
      setShowAlert({ type: "error", message: "Failed to process task!" });
    }
  };

  const handleEdit = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskForm({
        title: task.title,
        priority: task.priority,
        reminder: task.dueDate?.slice(0, 16),
        id: task.id,
      });
      setEditingTaskId(taskId);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8085/api/deleteTask/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setShowAlert({ type: "success", message: "Task deleted successfully!" });
    } catch (error) {
      console.error("Error deleting task:", error);
      setShowAlert({ type: "error", message: "Failed to delete task!" });
    }
  };

  const handleSetReminder = (task) => {
    alert(`Reminder set for task: ${task.title} at ${task.dueDate}`);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 style={{ paddingBottom: "30px" }}>Task Dashboard</h1>
      {showAlert.message && (
        <div className={`alert ${showAlert.type}`}>{showAlert.message}</div>
      )}

      <div className="task-header">
        <input
          style={{
            display:"flex",
            justifyContent:"start",
            width: "24%",
            height: "50px",
            borderRadius: "20px",
            fontSize: "20px",
            padding: "8px",
            border: "none",
          }}
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="Enter task"
          value={taskForm.title}
          onChange={handleChange}
          required
        />
        <select id="priority" value={taskForm.priority} onChange={handleChange}>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="datetime-local"
          id="reminder"
          value={taskForm.reminder}
          onChange={handleChange}
        />
        <button type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="task-lists">
        {["High", "Medium", "Low"].map((priority) => (
          <div className="task-list" key={priority}>
            <h2>{priority} Priority Tasks</h2>
            <div className="task-items">
              {filteredTasks
                .filter((task) => task.priority === priority)
                .map((task) => (
                  <div className="task-card" key={task.id}>
                    <h3>{task.title}</h3>
                    <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
                    <div className="task-actions">
                      <button onClick={() => handleEdit(task.id)}>Edit</button>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleSetReminder(task)}>
                        Set Reminder
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManagementApp;
