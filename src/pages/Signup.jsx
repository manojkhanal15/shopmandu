import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Signup = () => {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password);
      navigate("/");
    } catch {
      setError("Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch {
      setError("Google signup failed");
    }
  };

  return (
    <div className="auth">
      <div className="auth-left">
        <h2>Create Account</h2>
      </div>

      <div className="auth-right">
        <h2>Sign Up</h2>

        {error && <p className="auth-error">{error}</p>}

        {/* 🔥 Google */}
        <button className="google-btn" onClick={handleGoogleSignup}>
          Sign up with Google
        </button>

        <p className="divider">OR</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;