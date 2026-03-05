import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);

    // Reschedule notifications after refresh
    savedTodos.forEach((todo) => {
      if (!todo.completed) {
        scheduleNotification(todo);
      }
    });

    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addOrUpdateTodo = () => {
    if (!task || !dateTime) return;

    if (editingId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId
          ? { ...todo, text: task, time: new Date(dateTime).getTime() }
          : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        time: new Date(dateTime).getTime(),
        completed: false,
      };

      setTodos([...todos, newTodo]);
      scheduleNotification(newTodo);
    }

    setTask("");
    setDateTime("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (todo) => {
    setTask(todo.text);
    setDateTime(new Date(todo.time).toISOString().slice(0, 16));
    setEditingId(todo.id);
  };

  const scheduleNotification = (todo) => {
    const delay = todo.time - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        new Notification("⏰ Task Reminder", {
          body: todo.text,
        });
      }, delay);
    }
  };

  return (
    <div className="container">
      <h1>📋 Advanced Todo Reminder</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <button onClick={addOrUpdateTodo}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <div className="list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`card ${todo.completed ? "completed" : ""}`}
          >
            <div>
              <h3>{todo.text}</h3>
              <p>{new Date(todo.time).toLocaleString()}</p>
            </div>

            <div className="actions">
              <button onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => editTodo(todo)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
