import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../services/authService"; // Import API call
import "../styles/Login.css";
import { performLogin } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Attempting login with:", email, password);

    if (!email.trim() || !password.trim()) {
      setError("Both email and password are required!");
      return;
    }

    try {
      const userData = await login(email, password); // Call API
      console.log("Login successful! User data:", userData);

      if (userData) {
        await dispatch(performLogin(email, password));
        console.log("User saved in Redux. Redirecting...");
        navigate("/dashboard", { replace: true });
      } else {
        console.log("No user data received!");
      }
    } catch (err) {
      console.error(" Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center">Welcome Back!</h2>
          <p className="text-muted text-center">Login to continue</p>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* 🔹 Forgot Password Link */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="login-btn mt-4 w-100">
              Login
            </Button>

            <p className="text-center mt-3">
              Not signed up yet?{" "}
              <Link to="/register" className="register-link">
                Create an account
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
