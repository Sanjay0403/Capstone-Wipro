import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../styles/Home.css"; // Import the updated CSS file

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Container fluid className="home-container">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="home-title">Welcome to Personal Finance Tracker</h1>
            <p className="home-subtitle">
              Manage your income, track expenses, and gain financial insights with ease.
            </p>
            <Button href="/register" className="cta-button">
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Services Section */}
      <Container fluid className="services-container">
        <h2 className="services-title">Our Services</h2>
        <Row className="justify-content-center">
          {/* Service 1 */}
          <Col md={4} className="service-card">
            <Card>
              <Card.Body>
                <Card.Title>💰 Expense Tracking</Card.Title>
                <Card.Text>
                  Easily log and categorize your expenses to understand your spending habits.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 2 */}
          <Col md={4} className="service-card">
            <Card>
              <Card.Body>
                <Card.Title>📊 Financial Insights</Card.Title>
                <Card.Text>
                  Get reports and analytics to see where your money is going.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 3 */}
          <Col md={4} className="service-card">
            <Card>
              <Card.Body>
                <Card.Title>🔒 Secure & Private</Card.Title>
                <Card.Text>
                  Your financial data is secure with encrypted storage and authentication.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
