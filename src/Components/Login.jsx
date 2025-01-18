import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFiles/Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate=useNavigate();
  // Dummy users for verification
  const dummyUsers = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("username", username);
      console.log("Logged in as: " + username);
      navigate("/home")
      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
