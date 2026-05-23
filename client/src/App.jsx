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
    <Container fluid className="py-5">
      <Card className="mx-auto shadow" style={{ maxWidth: "850px" }}>
        <div className="header-img d-flex justify-content-center align-items-center">
          <h2 className="mb-2">
            Butler's Access Code
          </h2>
        </div>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            fill
          >
            <Tab eventKey="login" title="Login" tabClassName="w-100 text-center">
              <Login />
            </Tab>
            <Tab eventKey="register" title="Register" tabClassName="w-100 text-center">
              <Register />
            </Tab>
          </Tabs>
      </Card>
    </Container>
  );
}

export default App;