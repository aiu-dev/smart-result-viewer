import { useState } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import ThemeToggle from "./components/ThemeToggle";

import {
  loadTasks,
  addTask,
  deleteTask,
  toggleTask
} from "./utils/storage";

function App() {

  // Load tasks from storage
  const [tasks, setTasks] = useState(loadTasks());

  // Theme state
  const [dark, setDark] = useState(false);

  // Add new task
  function handleAddTask(text) {

    if (!text.trim()) return;

    const newTask = {
      text: text,
      done: false
    };

    const updatedTasks = addTask(tasks, newTask);

    setTasks(updatedTasks);
  }

  // Delete task
  function handleDeleteTask(index) {

    const updatedTasks = deleteTask(tasks, index);

    setTasks(updatedTasks);
  }

  // Toggle task completion
  function handleToggleTask(index) {

    const updatedTasks = toggleTask(tasks, index);

    setTasks(updatedTasks);
  }

  // Switch theme
  function toggleTheme() {
    setDark(!dark);
  }

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>

      <GlobalStyle />

      <Header toggleTheme={toggleTheme} />

      <TaskForm addTask={handleAddTask} />

      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task.text}
          done={task.done}
          onDelete={() => handleDeleteTask(index)}
          onToggle={() => handleToggleTask(index)}
        />
      ))}

    </ThemeProvider>
  );
}

export default App;
