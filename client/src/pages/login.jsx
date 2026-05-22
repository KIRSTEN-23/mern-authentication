import { useState } from "react";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";

function Login() {
  
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [lighting, setLighting] = useState("");
  const [drink, setDrink] = useState("");
  const [music, setMusic] = useState("");
  const [fireplace, setFireplace] = useState(false);
  const [pillows, setPillows] = useState(1);

  const [interactionOrder, setInteractionOrder] = useState([]);
  const [error, setError] = useState("");

  const updateInteraction = (actionName, isActive) => {

  setInteractionOrder((currentOrder) => {

    // =====================================================
    // REMOVE interaction if deselected
    // =====================================================

    if (!isActive) {

      return currentOrder.filter(
        (item) => item !== actionName
      );

    }

    // =====================================================
    // Prevent duplicates
    // =====================================================

    if (currentOrder.includes(actionName)) {

      return currentOrder;

    }

    // =====================================================
    // Add new interaction to end of sequence
    // =====================================================

    return [...currentOrder, actionName];

  });

};

  const clearInteractionOrder = () => {
    setInteractionOrder([]);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    const butlerAccessCode = {
      lighting,
      drink,
      music,
      fireplace,
      pillows,
      interactionOrder,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          loginIdentifier,
          password,
          butlerAccessCode,
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <>
      <h2 className="mb-2">Butler's Access Code Login</h2>
      <p className="text-muted">
        Recreate your saved suite setup to unlock your account.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username or Email"
                required
                value={loginIdentifier}
                onChange={(event) => setLoginIdentifier(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <hr />

            <h5>Recreate Your Suite</h5>

            <Form.Group className="mb-3">
              <Form.Label>Lighting</Form.Label>
              <Form.Select
                required
                value={lighting}
                onChange={(event) => {
                  setLighting(event.target.value);
                  updateInteraction("lighting", true);
                }}
              >
                <option value="">Choose lighting</option>
                <option value="warm">Warm lighting</option>
                <option value="gold">Gold lighting</option>
                <option value="dim">Dim lighting</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Drink</Form.Label>
              <Form.Select
                required
                value={drink}
                onChange={(event) => {
                  setDrink(event.target.value);
                  updateInteraction("drink", true);
                }}
              >
                <option value="">Choose drink</option>
                <option value="tea">Tea</option>
                <option value="coffee">Coffee</option>
                <option value="champagne">Champagne</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Music</Form.Label>
              <Form.Select
                required
                value={music}
                onChange={(event) => {
                  setMusic(event.target.value);
                  addInteraction("music");
                }}
              >
                <option value="">Choose music</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="ambient">Ambient</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Fireplace on"
                checked={fireplace}
                onChange={(event) => {
                  setFireplace(event.target.checked);
                  addInteraction("fireplace");
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pillows</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="10"
                required
                value={pillows}
                onChange={(event) => {
                  setPillows(Number(event.target.value));
                  addInteraction('pillows');
                }}
              />
            </Form.Group>

            <Alert variant="secondary">
              <strong>Interaction order:</strong>{" "}
              {interactionOrder.length > 0
                ? interactionOrder.join(" → ")
                : "No actions yet"}
            </Alert>

            <Button
              variant="outline-secondary"
              type="button"
              onClick={clearInteractionOrder}
            >
              Clear Order
            </Button>

            <Button variant="dark" type="submit" className="ms-2">
              Login
            </Button>
          </Form>
    </>
  );
}

export default Login;
