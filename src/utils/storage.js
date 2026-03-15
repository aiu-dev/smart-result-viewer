const TASK_KEY = "tasks";

/*
Load tasks from localStorage
*/
export function loadTasks() {
  try {
    const data = localStorage.getItem(TASK_KEY);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

/*
Save tasks to localStorage
*/
export function saveTasks(tasks) {
  try {
    const data = JSON.stringify(tasks);
    localStorage.setItem(TASK_KEY, data);
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

/*
Add new task
*/
export function addTask(tasks, newTask) {
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return updatedTasks;
}

/*
Delete task
*/
export function deleteTask(tasks, index) {
  const updatedTasks = tasks.filter((_, i) => i !== index);
  saveTasks(updatedTasks);
  return updatedTasks;
}

/*
Toggle task status
*/
export function toggleTask(tasks, index) {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, done: !task.done } : task
  );

  saveTasks(updatedTasks);
  return updatedTasks;
}

/*
Clear all tasks
*/
export function clearTasks() {
  localStorage.removeItem(TASK_KEY);
}
