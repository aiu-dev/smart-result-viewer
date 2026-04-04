import { useState } from "react";
import { API } from "../services/api";

function Auth({ role, setUser }) {

  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    matric: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 LECTURER LOGIN
  const handleLecturerLogin = async () => {
    const res = await API.get("/lecturers");

    const lecturer = res.data.find(l =>
      l.email === form.email &&
      l.password === form.password
    );

    if (lecturer) {
      setUser({ ...lecturer, role: "lecturer" });
      localStorage.setItem("user", JSON.stringify({ ...lecturer, role: "lecturer" }));
    } else {
      alert("Invalid login");
    }
  };

  // 📝 LECTURER SIGNUP
  const handleSignup = async () => {
    await API.post("/lecturers", {
      email: form.email,
      password: form.password
    });

    alert("Lecturer registered");
    setIsSignup(false);
  };

  // 🎓 STUDENT LOGIN
  const handleStudentLogin = async () => {
    const res = await API.get("/students");

    const student = res.data.find(s =>
      s.fullname.toLowerCase() === form.fullname.toLowerCase() &&
      s.matric.toLowerCase() === form.matric.toLowerCase()
    );

    if (student) {
      setUser({ ...student, role: "student" });
      localStorage.setItem("user", JSON.stringify({ ...student, role: "student" }));
    } else {
      alert("Student not found");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          {role === "lecturer"
            ? (isSignup ? "Lecturer Signup" : "Lecturer Login")
            : "Student Login"}
        </h2>

        {/* LECTURER */}
        {role === "lecturer" && (
          <>
            <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />

            <button
              onClick={isSignup ? handleSignup : handleLecturerLogin}
              className="bg-blue-600 text-white w-full p-2 rounded"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <p
              className="text-sm mt-2 text-center text-blue-500 cursor-pointer"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Back to Login" : "Create Account"}
            </p>
          </>
        )}

        {/* STUDENT */}
        {role === "student" && (
          <>
            <input name="fullname" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="matric" placeholder="Matric Number" onChange={handleChange} className="border p-2 w-full mb-2" />

            <button
              onClick={handleStudentLogin}
              className="bg-green-600 text-white w-full p-2 rounded"
            >
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Auth;
