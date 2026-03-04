import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [todos, setTodos] = useState([]);

  // Ask notification permission on load
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const addTodo = () => {
    if (!task || !dateTime) return;

    const newTodo = {
      id: Date.now(),
      text: task,
      time: new Date(dateTime).getTime(),
    };

    setTodos([...todos, newTodo]);
    scheduleNotification(newTodo);

    setTask("");
    setDateTime("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
    <div style={styles.container}>
      <h1>📋 Todo Reminder App</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />

        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          style={styles.input}
        />

        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      <div style={styles.list}>
        {todos.map((todo) => (
          <div key={todo.id} style={styles.card}>
            <div>
              <strong>{todo.text}</strong>
              <p>{new Date(todo.time).toLocaleString()}</p>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    marginTop: "20px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default App;
