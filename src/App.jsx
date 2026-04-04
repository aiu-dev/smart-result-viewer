import { useState } from "react";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [role, setRole] = useState(null);

  if (!user && !role) return <Welcome setRole={setRole} />;

  if (!user) return <Auth role={role} setUser={setUser} />;

  if (user.role === "lecturer") return <Admin user={user} />;

  return <Dashboard user={user} />;
}

export default App;
