import { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [lighting, setLighting] = useState("");
  const [drink, setDrink] = useState("");
  const [music, setMusic] = useState("");
  const [fireplace, setFireplace] = useState(false);
  const [pillows, setPillows] = useState(1);

  const [interactionOrder, setInteractionOrder] = useState([]);
  const [error, setError] = useState("");

  const addInteraction = (actionName) => {
    setInteractionOrder((currentOrder) => [...currentOrder, actionName]);
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
          username,
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
    <Container className="py-5">
      <Card className="mx-auto shadow" style={{ maxWidth: "650px" }}>
        <Card.Body>
          <h2 className="mb-2">Butler’s Access Code Login</h2>
          <p className="text-muted">
            Recreate your saved suite setup to unlock your account.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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
                  addInteraction("lighting");
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
                  addInteraction("drink");
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

              <div className="d-flex align-items-center">
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setPillows((current) => Math.max(1, current - 1));
                    addInteraction("pillows");
                  }}
                >
                  -
                </Button>

                <span className="mx-3 fs-5">{pillows}</span>

                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setPillows((current) => current + 1);
                    addInteraction("pillows");
                  }}
                >
                  +
                </Button>
              </div>
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
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
