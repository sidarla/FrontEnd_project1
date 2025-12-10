import { useState, useContext } from "react";
import API from "../api/axiosConfig";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { setUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("New user created successfully");
      navigate("/"); // Navigate to login page
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-form">
      <div>
        <h2>Sign Up</h2>
      </div>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
      <p style={{ textAlign: "center", marginTop: "15px", color: "var(--text-secondary)" }}>
        Already have an account? <Link to="/" style={{ color: "var(--primary-color)", textDecoration: "none", fontWeight: "600" }}>Login</Link>
      </p>
    </form>
  );
}
