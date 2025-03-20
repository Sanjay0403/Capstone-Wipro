import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/Support.css";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Request Submitted:", formData);
    alert("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container className="support-container">
      <h1 className="support-title">Need Help? Contact Our Support</h1>
      <p className="support-subtitle">
        If you have any questions or need assistance, feel free to reach out to us.
      </p>

      <Row className="justify-content-center">
        {/* Contact Form */}
        <Col md={6}>
          <Card className="support-card">
            <Card.Body>
              <h3 className="text-center">Send Us a Message</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mt-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="message" className="mt-3">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="support-btn mt-4">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Support Information */}
        <Col md={5}>
          <Card className="support-card">
            <Card.Body>
              <h3>Contact Information</h3>
              <p>
                📧 Email: <a href="mailto:Fintracker@gmail.com">Fintracker@gmail.com</a>
              </p>
              <p>📞 Phone: +91 9955442277</p>
              <p>📍 Address: Hyderabad, Telangana, India</p>
              <p>
                🕒 Support Hours: <br />
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h3 className="text-center">Frequently Asked Questions</h3>
          <Card className="faq-card">
            <Card.Body>
              <h5>How do I reset my password?</h5>
              <p>Click on "Forgot Password" on the login page and follow the instructions.</p>

              <h5>Is my financial data secure?</h5>
              <p>Yes! We use end-to-end encryption to keep your data safe.</p>

              <h5>Can I access my account from multiple devices?</h5>
              <p>Yes, you can log in from any device with your credentials.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
