import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:7144/api/auth/forgot-password",
        { email }
      );

      if (response.status === 200) {
        setMessage("A password reset link has been sent to your email.");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Try again.");
    }
  };

  return (
    <Container className="forgot-password-container">
      <Card className="forgot-password-card">
        <Card.Body>
          <h2 className="text-center fw-bold">Forgot Password?</h2>
          <p className="text-muted text-center">
            Enter your registered email, and we'll send you a reset link.
          </p>
          {message && <Alert variant="success" className="text-center">{message}</Alert>}
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
                className="custom-input"
              />
            </Form.Group>

            <Button type="submit" className="forgot-password-btn mt-4 w-100">
              Send Reset Link
            </Button>

            <p className="text-center mt-3">
              Remember your password?{" "}
              <div>
              <a href="/login" className="login-link">Back to Login</a>

              </div>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
