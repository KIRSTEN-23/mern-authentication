//--------------------------------------------------------------------------------------------------------------
// Registration
//--------------------------------------------------------------------------------------------------------------

import { useState } from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage("User created successfully!");

      console.log(response.data);

    } catch (error) {

      setMessage("Error creating user.");

      console.log(error);

    }

  };


  return (

    <div style={{ padding: "20px" }}>

      <h1>Create User</h1>

      <form onSubmit={handleSubmit}>

        <div>

          <label>Name:</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        <br />

        <div>

          <label>Email:</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <br />

        <div>

          <label>Password:</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <br />

        <button type="submit">
          Create User
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>

  );

}

export default App;