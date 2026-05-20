//--------------------------------------------------------------------------------------------------------------
// Registration
//--------------------------------------------------------------------------------------------------------------

import { useState } from "react";

import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";

import { Button, Container } from "react-bootstrap";

function App() {
  const [activeTab, setActiveTab] = useState("login");

  const token = localStorage.getItem("token");

  if (token) {
    return <Dashboard />;
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center gap-2 mb-4">
        <Button
          variant={activeTab === "login" ? "dark" : "outline-dark"}
          onClick={() => setActiveTab("login")}
        >
          Login
        </Button>

        <Button
          variant={activeTab === "register" ? "dark" : "outline-dark"}
          onClick={() => setActiveTab("register")}
        >
          Register
        </Button>
      </div>

      {activeTab === "login" && <Login />}

      {activeTab === "register" && <Register />}
    </Container>
  );
}

export default App;