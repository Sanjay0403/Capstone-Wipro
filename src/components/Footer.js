import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";
import logo from "../assets/logo.webp"; // Ensure the logo is in /src/assets/

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center text-center">
          {/* Navigation Links */}
          <Col md={4} className="footer-links">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/support">Support</a>

            <a href="mailto:Fintracker@gmail.com">Support: Fintracker@gmail.com</a>
          </Col>

          {/* Copyright */}
          <Col md={4}>
            <p className="footer-text">
              &copy; 2025 Personal Finance Tracker. All rights reserved.
            </p>
          </Col>

          {/* Social Media & Brand */}
          <Col md={4} className="footer-social">
            <span className="social-text">Follow us -</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <div className="brand-logo">
              <img src={logo} alt="FinTracker Logo" className="footer-logo" />
              <span className="brand-name">FinTracker</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
