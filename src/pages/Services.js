import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaMoneyBillWave, FaChartPie, FaLock, FaBell, FaUsers, FaMobileAlt } from "react-icons/fa";
import "../styles/Services.css";

const Services = () => {
  return (
    <Container fluid className="services-container">
      <h2 className="services-title">Our Services</h2>
      <p className="services-subtitle">
        Manage your finances effortlessly with our powerful tracking tools.
      </p>

      <Row className="justify-content-center">
        {/* Expense Tracking */}
        <Col md={4} className="service-card">
          <Card className="shadow-lg">
            <Card.Body>
              <FaMoneyBillWave className="service-icon" />
              <Card.Title>Expense Tracking</Card.Title>
              <Card.Text>
                Log and categorize your expenses effortlessly. Gain insights into your spending patterns.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Financial Insights */}
        <Col md={4} className="service-card">
          <Card className="shadow-lg">
            <Card.Body>
              <FaChartPie className="service-icon" />
              <Card.Title>Financial Insights</Card.Title>
              <Card.Text>
                Get detailed analytics and reports on your income and expenses to make informed decisions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Secure & Private */}
        <Col md={4} className="service-card">
          <Card className="shadow-lg">
            <Card.Body>
              <FaLock className="service-icon" />
              <Card.Title>Secure & Private</Card.Title>
              <Card.Text>
                Your data is encrypted and protected with advanced security protocols for your privacy.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {/* Budgeting Alerts */}
        <Col md={4} className="service-card">
          <Card className="shadow-lg">
            <Card.Body>
              <FaBell className="service-icon" />
              <Card.Title>Budgeting Alerts</Card.Title>
              <Card.Text>
                Set up custom alerts and notifications to stay within your budget and avoid overspending.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Multi-User Access */}
        <Col md={4} className="service-card">
          <Card className="shadow-lg">
            <Card.Body>
              <FaUsers className="service-icon" />
              <Card.Title>Multi-User Access</Card.Title>
              <Card.Text>
                Collaborate with family or business partners by allowing multiple users to access accounts securely.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Mobile-Friendly */}
        <Col md={4} className="service-card">
          <Card className="shadow-lg">
            <Card.Body>
              <FaMobileAlt className="service-icon" />
              <Card.Title>Mobile-Friendly</Card.Title>
              <Card.Text>
                Access your finances on the go with a seamless and responsive mobile-friendly interface.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
