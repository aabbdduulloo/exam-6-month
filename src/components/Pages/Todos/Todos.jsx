import React, { useState } from "react";
import "./Todos.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState({
    open: "",
    pending: "",
    inprog: "",
    complete: "",
  });

  const addTask = status => {
    if (newTasks[status].trim() !== "") {
      setTasks([...tasks, { title: newTasks[status], status }]);
      setNewTasks({ ...newTasks, [status]: "" });
    }
  };

  const deleteTask = taskTitle => {
    setTasks(tasks.filter(task => task.title !== taskTitle));
  };

  const updateTaskStatus = (taskTitle, newStatus) => {
    setTasks(
      tasks.map(task =>
        task.title === taskTitle ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleNewTaskChange = (status, value) => {
    setNewTasks({ ...newTasks, [status]: value });
  };

  return (
    <div className="task-board">
      {["open", "pending", "inprog", "complete"].map(status => (
        <div key={status} className="task-column">
          <h3 className="task-column-title">{status}</h3>
          {tasks
            .filter(task => task.status === status)
            .map(task => (
              <Card key={task.title} className="task-item">
                <CardContent>
                  <Typography variant="h6" className="task-title">
                    {task.title}
                  </Typography>
                  <div className="task-controls">
                    <Select
                      value={task.status}
                      onChange={e =>
                        updateTaskStatus(task.title, e.target.value)
                      }
                      className="task-select"
                    >
                      {["open", "pending", "inprog", "complete"].map(stat => (
                        <MenuItem key={stat} value={stat}>
                          {stat}
                        </MenuItem>
                      ))}
                    </Select>
                    <IconButton
                      onClick={() => deleteTask(task.title)}
                      className="task-delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          <TextField
            value={newTasks[status]}
            onChange={e => handleNewTaskChange(status, e.target.value)}
            placeholder={`Add a task to ${status}`}
            variant="outlined"
            fullWidth
            className="task-input"
          />
          <Button
            onClick={() => addTask(status)}
            variant="contained"
            color="primary"
            fullWidth
            className="task-add"
          >
            Add Task
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
