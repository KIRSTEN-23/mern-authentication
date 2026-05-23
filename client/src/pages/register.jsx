import { useState } from "react";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";
import { User, Mail, LockKeyhole } from "lucide-react";

/*
  ABOUT FILE: Register.jsx

  WHAT:
  This page lets a new user create an account and set up their Butler Access Code.

  HOW:
  The user enters email/password and chooses suite preferences through image selectors.
  These choices become one structured butlerAccessCode object.

  WHY:
  The project requires normal authentication principles, but with a creative login method.
  So the password handles traditional authentication, while the suite setup handles creative authentication.

  FLOW:
  Register form
  → Axios POST request
  → /api/auth/register backend route
  → bcrypt hashes password + Butler Access Code
  → user saved in MongoDB
*/

function Register() {
  {/* ---------------------------------------------------------------------------*/}
  {/* STEP 1: Basic account state
  {/* ---------------------------------------------------------------------------*/}

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  {/* ---------------------------------------------------------------------------*/}
  {/* STEP 2: Butler Access Code state 
  {/* ---------------------------------------------------------------------------*/}

  const [lighting, setLighting] = useState("");
  const [drink, setDrink] = useState("");
  const [music, setMusic] = useState("");
  const [fireplace, setFireplace] = useState(false);
  const [pillows, setPillows] = useState(1);

  {/* ---------------------------------------------------------------------------*/}
  {/* STEP 3: UI feedback state
  {/* ---------------------------------------------------------------------------*/}

  const [interactionOrder, setInteractionOrder] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  {/* ---------------------------------------------------------------------------*/}
  {/* STEP 4: Manage interaction order
  {/* ---------------------------------------------------------------------------*/}
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
    Like a butler writing a checklist. He adds a new instruction once,
    ignores duplicates, and removes cancelled instructions.
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

  {/* ---------------------------------------------------------------------------*/}
  {/* STEP 5: Submit registration
  {/* ---------------------------------------------------------------------------*/}

  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage("");
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
        "http:{/*localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
          butlerAccessCode,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <>
      <h3 className="mb-2">Your Details</h3>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleRegister}>
        
        {/* ----------------------------------------------------------------*/}
        {/* ACCOUNT DETAILS                                               
        {/* ----------------------------------------------------------------*/} 

        
        {/* -------------------USERNAME----------------------*/}

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>

          <div className="position-relative">

            {/* ICON */}
            <User size={24} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ color: "brown" }} />

            <Form.Control
              type="text"
              placeholder="Optional username"
              className="ps-5"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

        </Form.Group>


        
        {/* -------------------EMAIL------------------------*/}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          
          <div className="position-relative">
          
            {/* ICON */}
            <Mail size={24} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ color: "brown" }} />

          <Form.Control
            type="email"
            required
            placeholder="Example: kirsten@email.com"
            className="ps-5"
            value={email}
            onChange={(event) => setEmail(event.target.value)}  
          />
          </div>
        </Form.Group>


        {/* -------------------PASSWORD----------------------*/}

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>

          <div className="position-relative">

            {/* ICON */}
            <LockKeyhole size={24} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ color: "brown" }} />
          <Form.Control
            type="password"
            required
            minLength={6}
            placeholder="Minimum 6 characters"
            className="ps-5"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          </div>
        </Form.Group>

        <hr />

        {/* ----------------------------------------------------------------*/} 
        {/* IMAGE SELECTORS
        {/* ----------------------------------------------------------------*/}

        <h3>Suite Setup</h3>

        <p className="text-muted py-2">
        Set up your private luxury suite combination. You will recreate this
        during login.
        </p>

        {/* -------------------LIGHTING IMAGE SELECTOR----------------------*/}


        <Form.Group className="mb-4">
          <Form.Label>Lighting</Form.Label>

          <div className="image-selector-grid">
            
            {/* -------------------------WARM-------------------------------*/}
            
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


            {/* -------------------------COOL-------------------------------*/}
            
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

            {/* -------------------------ROMANTIC---------------------------*/}

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
        

        {/* ---------------------DRINK IMAGE SELECTOR------------------------*/}                                        

        <Form.Group className="mb-4">
          <Form.Label>Drink</Form.Label>

          {/* ---------------------------TEA---------------------------------*/}

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

          {/* -------------------------COFFEE-------------------------------*/}

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

            {/* ----------------------CHAMPAGNE------------------------------*/}

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

        
        
        {/* ------------------------MUSIC IMAGE SELECTOR-------------------*/}

        <Form.Group className="mb-4">
          <Form.Label>Music</Form.Label>

          {/* ---------------------------JAZZ------------------------------*/}

          <div className="d-flex gap-4 flex-wrap justify-content-center">
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

            {/* -------------------------CLASSICAL-------------------------------*/}

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

            {/* ---------------------------AMBIENT------------------------------*/}

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

        {/* ----------------------------------------------------------------*/} 
        {/* FIREPLACE 
        {/* ----------------------------------------------------------------*/}


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


        {/* ----------------------------------------------------------------*/} 
        {/* PILLOWS 
        {/* ----------------------------------------------------------------*/}

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
              handleInteraction("pillows", true);
            }}
          />
        </Form.Group>

        {/* ---------------------------------------------------------------- */}
        {/* INTERACTION ORDER FEEDBACK 
        {/* ----------------------------------------------------------------*/}

        <Alert variant="secondary">
          <strong>Interaction order:</strong>{" "}
          {interactionOrder.length > 0
            ? interactionOrder.join(" → ")
            : "No actions yet"}
        </Alert>


        {/* ---------------------------------------------------------------- */}
        {/* SUBMIT & CLEAR BUTTONS
        {/* ----------------------------------------------------------------*/}

        <Button
          variant="outline-secondary"
          type="button"
          onClick={clearInteractionOrder}
        >
          Clear Order
        </Button>

        {/* ----------------------------------------------------------------*/}

        <Button variant="dark" type="submit" className="ms-2">
          Register
        </Button>
      </Form>
    </>
  );
}

export default Register;