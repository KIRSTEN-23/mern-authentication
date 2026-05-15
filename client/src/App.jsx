

//--------------------------------------------------------------------------------------------------------------
// React Router setup(!!!template only. DO NOT Merge into Main) for the MERN Luxury Accommodation application. 
// This code defines the main App component and sets up the routes for different pages in the application.
//--------------------------------------------------------------------------------------------------------------

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import SellerDashboard from "./pages/SellerDashboard";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/listings" element={<Listings />} />

        <Route path="/seller" element={<SellerDashboard />} />

        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
    </div>
  );
}

export default App;



//--------------------------------------------------------------------------------------------------------------
// Template code for testing React-Bootstrap and Axios. 
// This code is not part of the final application and can be removed or modified as needed.
//--------------------------------------------------------------------------------------------------------------

// import Button from 'react-bootstrap/Button';

// function App() {
//   return (
//     <div className="p-5">
//       <h1>MERN Luxury Accommodation</h1>

//       <Button variant="dark">
//         Bootstrap Working
//       </Button>
//     </div>
//   );
// }

// export default App;

//--------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------
// Registration
//--------------------------------------------------------------------------------------------------------------

// import { useState } from "react";
// import axios from "axios";

// function App() {

//   const [name, setName] = useState("");

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const [message, setMessage] = useState("");


//   const handleSubmit = async (event) => {

//     event.preventDefault();

//     try {

//       const response = await axios.post(
//         "http://localhost:5000/api/users/register",
//         {
//           name,
//           email,
//           password,
//         }
//       );

//       setMessage("User created successfully!");

//       console.log(response.data);

//     } catch (error) {

//       setMessage("Error creating user.");

//       console.log(error);

//     }

//   };


//   return (

//     <div style={{ padding: "20px" }}>

//       <h1>Create User</h1>

//       <form onSubmit={handleSubmit}>

//         <div>

//           <label>Name:</label>

//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//         </div>

//         <br />

//         <div>

//           <label>Email:</label>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//         </div>

//         <br />

//         <div>

//           <label>Password:</label>

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//         </div>

//         <br />

//         <button type="submit">
//           Create User
//         </button>

//       </form>

//       {message && <p>{message}</p>}

//     </div>

//   );

// }

// export default App;

//--------------------------------------------------------------------------------------------------------------