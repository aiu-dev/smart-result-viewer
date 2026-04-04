import { useState } from "react";
import { API } from "../services/api";

function Login({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.get("/users");

      const foundUser = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        setUser(foundUser);
      } else {
        setError("Invalid credentials");
      }

    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

      </div>
    </div>
  );
}

export default Login;
