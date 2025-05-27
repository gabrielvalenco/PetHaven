import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>PetHaven</h5>
            <p className="text-muted">
              Connecting loving homes with animals in need.
              <br />
              Every pet deserves a forever home.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/animals" className="text-decoration-none text-light">Animals</a></li>
              <li><a href="/ngos" className="text-decoration-none text-light">NGOs</a></li>
              <li><a href="/login" className="text-decoration-none text-light">Login</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope me-2"></i> info@pethaven.com</li>
              <li><i className="bi bi-phone me-2"></i> +1 (555) 123-4567</li>
              <li><i className="bi bi-geo-alt me-2"></i> 123 Adoption Street, Petville</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} PetHaven. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
