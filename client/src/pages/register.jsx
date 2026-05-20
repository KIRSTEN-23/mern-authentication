import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [lighting, setLighting] = useState('');
  const [drink, setDrink] = useState('');
  const [music, setMusic] = useState('');
  const [fireplace, setFireplace] = useState(false);
  const [pillows, setPillows] = useState(1);

  const [interactionOrder, setInteractionOrder] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const addInteraction = (actionName) => {
    setInteractionOrder((currentOrder) => [...currentOrder, actionName]);
  };

  const clearInteractionOrder = () => {
    setInteractionOrder([]);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage('');
    setError('');

    const butlerAccessCode = {
      lighting,
      drink,
      music,
      fireplace,
      pillows,
      interactionOrder,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        butlerAccessCode,
      });

      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow" style={{ maxWidth: '650px' }}>
        <Card.Body>
          <h2 className="mb-2">Create Your Butler’s Access Code</h2>
          <p className="text-muted">
            Set up your private luxury suite combination. You will recreate this during login.
          </p>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <hr />

            <h5>Suite Setup</h5>

            <Form.Group className="mb-3">
              <Form.Label>Lighting</Form.Label>
              <Form.Select
                required
                value={lighting}
                onChange={(event) => {
                  setLighting(event.target.value);
                  addInteraction('lighting');
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
                  addInteraction('drink');
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
                  addInteraction('music');
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
                  addInteraction('fireplace');
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
              <strong>Interaction order:</strong>{' '}
              {interactionOrder.length > 0 ? interactionOrder.join(' → ') : 'No actions yet'}
            </Alert>

            <Button variant="outline-secondary" type="button" onClick={clearInteractionOrder}>
              Clear Order
            </Button>

            <Button variant="dark" type="submit" className="ms-2">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;