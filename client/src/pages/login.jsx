import { useState } from "react";
import axios from "axios";
import { Alert, Button, Form, Container, Col, Row } from "react-bootstrap";

/*
  ABOUT FILE: Login.jsx

  WHAT:
  This page lets an existing user sign in using:
  1. username OR email
  2. password
  3. Butler Access Code suite setup

  HOW:
  The user types their login details and recreates their saved suite setup
  using image selectors. The frontend turns those choices into a
  butlerAccessCode object and sends it to the backend.

  WHY:
  This keeps the normal security requirement of password authentication,
  while adding the creative authentication layer required by the brief.

  FLOW:
  Login form
  → Axios POST request
  → /api/auth/login backend route
  → backend finds user by username OR email
  → backend compares password hash
  → backend compares Butler Access Code hash
  → JWT token returned
  → dashboard becomes accessible
*/

function Login() {
  // ---------------------------------------------------------------------------
  // STEP 1: Login identity state
  // ---------------------------------------------------------------------------

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // ---------------------------------------------------------------------------
  // STEP 2: Butler Access Code state
  // ---------------------------------------------------------------------------

  const [lighting, setLighting] = useState("");
  const [drink, setDrink] = useState("");
  const [music, setMusic] = useState("");
  const [fireplace, setFireplace] = useState(false);
  const [pillows, setPillows] = useState(1);

  // ---------------------------------------------------------------------------
  // STEP 3: UI feedback state
  // ---------------------------------------------------------------------------

  const [interactionOrder, setInteractionOrder] = useState([]);
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // STEP 4: Manage interaction order
  // ---------------------------------------------------------------------------
  /*
    INPUT:
    actionName = "lighting", "drink", "music", etc.
    isActive = true/false

    PROCESS:
    If deselected, remove it.
    If already selected, do not duplicate it.
    If new, add it to the end.

    OUTPUT:
    Updated interactionOrder array.

    ANALOGY:
    Like a butler managing the order of guest instructions.
    He writes each instruction once, removes cancelled requests,
    and keeps the sequence meaningful.
  */

  const handleInteraction = (actionName, isActive) => {
    setInteractionOrder((currentOrder) => {
      if (!isActive) {
        return currentOrder.filter((item) => item !== actionName);
      }

      if (currentOrder.includes(actionName)) {
        return currentOrder;
      }

      return [...currentOrder, actionName];
    });
  };

  const clearInteractionOrder = () => {
    setInteractionOrder([]);
  };

  // ---------------------------------------------------------------------------
  // STEP 5: Submit login
  // ---------------------------------------------------------------------------
  /*
    INPUT:
    loginIdentifier
    password
    butlerAccessCode

    PROCESS:
    Axios sends the data to the Express backend.

    OUTPUT:
    If successful, backend returns a JWT token and user object.
  */

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
        }
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
    <Container fluid>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin} className="w-80">
        {/* ---------------------------------------------------------------- */}
        {/* LOGIN DETAILS                                                     */}
        {/* ---------------------------------------------------------------- */}

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Username or Email</Form.Label>

                <Form.Control
                  type="text"
                  required
                  placeholder="Example: kirsten or kirsten@email.com"
                  value={loginIdentifier}
                  onChange={(event) => setLoginIdentifier(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          

        

        <hr />

        <h3>Recreate Your Suite</h3>

        {/* ---------------------------------------------------------------- */}
        {/* LIGHTING IMAGE SELECTOR                                           */}
        {/* ---------------------------------------------------------------- */}

        <Form.Group className="mb-4">
          <h2>Lighting</h2>

          <div className="image-selector-grid">
            <div
              className={`image-selector-card ${
                lighting === "warm" ? "selected-card" : ""
              }`}
              onClick={() => {
                setLighting("warm");
                handleInteraction("lighting", true);
              }}
            >
              <img src="/images/warm-lighting.jpg" alt="Warm Lighting" />
              <p>Warm</p>
            </div>

            <div
              className={`image-selector-card ${
                lighting === "cool" ? "selected-card" : ""
              }`}
              onClick={() => {
                setLighting("cool");
                handleInteraction("lighting", true);
              }}
            >
              <img src="/images/cool-lighting.jpg" alt="Cool Lighting" />
              <p>Cool</p>
            </div>

            <div
              className={`image-selector-card ${
                lighting === "romantic" ? "selected-card" : ""
              }`}
              onClick={() => {
                setLighting("romantic");
                handleInteraction("lighting", true);
              }}
            >
              <img
                src="/images/romantic-lighting.jpg"
                alt="Romantic Lighting"
              />
              <p>Romantic</p>
            </div>
          </div>
        </Form.Group>

        {/* ---------------------------------------------------------------- */}
        {/* DRINK IMAGE SELECTOR                                              */}
        {/* ---------------------------------------------------------------- */}

        <Form.Group className="mb-4">
          <h2>Drink</h2>

          <div className="image-selector-grid">
            <div
              className={`image-selector-card ${
                drink === "tea" ? "selected-card" : ""
              }`}
              onClick={() => {
                setDrink("tea");
                handleInteraction("drink", true);
              }}
            >
              <img src="/images/tea.jpg" alt="Tea" />
              <p>Tea</p>
            </div>

            <div
              className={`image-selector-card ${
                drink === "coffee" ? "selected-card" : ""
              }`}
              onClick={() => {
                setDrink("coffee");
                handleInteraction("drink", true);
              }}
            >
              <img src="/images/coffee.jpg" alt="Coffee" />
              <p>Coffee</p>
            </div>

            <div
              className={`image-selector-card ${
                drink === "champagne" ? "selected-card" : ""
              }`}
              onClick={() => {
                setDrink("champagne");
                handleInteraction("drink", true);
              }}
            >
              <img src="/images/champagne.jpg" alt="Champagne" />
              <p>Champagne</p>
            </div>
          </div>
        </Form.Group>

        {/* ---------------------------------------------------------------- */}
        {/* MUSIC IMAGE SELECTOR                                              */}
        {/* ---------------------------------------------------------------- */}

        <Form.Group className="mb-4">
          <h2>Music</h2>

          <div className="image-selector-grid ">
            <div
              className={`image-selector-card ${
                music === "jazz" ? "selected-card" : ""
              }`}
              onClick={() => {
                setMusic("jazz");
                handleInteraction("music", true);
              }}
            >
              <img src="/images/jazz.jpg" alt="Jazz" />
              <p>Jazz</p>
            </div>

            <div
              className={`image-selector-card ${
                music === "classical" ? "selected-card" : ""
              }`}
              onClick={() => {
                setMusic("classical");
                handleInteraction("music", true);
              }}
            >
              <img src="/images/classical.jpg" alt="Classical" />
              <p>Classical</p>
            </div>

            <div
              className={`image-selector-card ${
                music === "ambient" ? "selected-card" : ""
              }`}
              onClick={() => {
                setMusic("ambient");
                handleInteraction("music", true);
              }}
            >
              <img src="/images/ambient.jpg" alt="Ambient" />
              <p>Ambient</p>
            </div>
          </div>
        </Form.Group>

        {/* ---------------------------------------------------------------- */}
        {/* FIREPLACE + PILLOWS                                               */}
        {/* ---------------------------------------------------------------- */}

        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Fireplace on"
            checked={fireplace}
            onChange={(event) => {
              setFireplace(event.target.checked);
              handleInteraction("fireplace", event.target.checked);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pillows</Form.Label>

          <Form.Control
            className="w-25"
            type="number"
            min="1"
            max="10"
            required
            value={pillows}
            onChange={(event) => {
              setPillows(Number(event.target.value));
              handleInteraction("pillows", true);
            }}
          />
        </Form.Group>

        {/* ---------------------------------------------------------------- */}
        {/* INTERACTION ORDER FEEDBACK                                        */}
        {/* ---------------------------------------------------------------- */}

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
      </Container>
    </>
  );
}

export default Login;