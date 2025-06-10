import React, { useState } from "react";
import { login, register } from "./api";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register(username, firstname, lastname, password);
      }
      onAuth();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
      {mode === "register" && (
        <>
          <input value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="First Name" required />
          <input value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Last Name" required />
        </>
      )}
      <button type="submit">{mode === "login" ? "Log In" : "Register"}</button>
      <div>
        {mode === "login" ? (
          <button type="button" onClick={() => { setMode("register"); setError(""); }}>Go to Register</button>
        ) : (
          <button type="button" onClick={() => { setMode("login"); setError(""); }}>Go to Login</button>
        )}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}