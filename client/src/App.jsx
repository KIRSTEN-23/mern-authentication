//--------------------------------------------------------------------------------------------------------------
// Registration
//--------------------------------------------------------------------------------------------------------------

import { useState } from "react";

import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";

import { Container, Card, Tabs, Tab } from "react-bootstrap";

function App() {
  const [activeTab, setActiveTab] = useState("login");

  const token = localStorage.getItem("token");

  if (token) {
    return <Dashboard />;
  }

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow" style={{ maxWidth: "650px" }}>
        <Card.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Register />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;