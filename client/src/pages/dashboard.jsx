import { Button, Card, Container } from 'react-bootstrap';


function Dashboard() {

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  if (!token) {
    return (
      <Container className="py-5">
        <Card className="p-4 shadow">
          <h2>Access denied</h2>
          <p>Please log in first.</p>
          <Button variant="dark" onClick={() => window.location.reload()}>
            Go to Login
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="p-4 shadow">
        <h1>Welcome to Deluxe Bookings</h1>

        <p>
          Logged in as: <strong>{user?.username}</strong>
        </p>

        <p>Your JWT token has been saved in localStorage.</p>

        <Button variant="outline-danger" onClick={logout}>
          Logout
        </Button>
      </Card>
    </Container>
  );
}

export default Dashboard;