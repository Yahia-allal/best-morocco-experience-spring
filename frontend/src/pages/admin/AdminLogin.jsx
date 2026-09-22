import React, { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("adminToken", data.token);

      window.location.href = "/admin";
    } catch (err) {
      setError("Server connection error");
    }
  }

  return (
    <div className="loginPage">
      <div className="loginCard">
        <img
          src="/images/logo.png"
          alt="Best Morocco Experience"
          className="loginLogo"
        />

        <h1>Admin Login</h1>
        <p>Manage your Morocco experiences</p>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="loginError">{error}</div>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
