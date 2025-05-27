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
              Conectando lares amorosos com animais que precisam.
              <br />
              Todo pet merece um lar para sempre.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Links Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Início</a></li>
              <li><a href="/animals" className="text-decoration-none text-light">Animais</a></li>
              <li><a href="/ngos" className="text-decoration-none text-light">ONGs</a></li>
              <li><a href="/login" className="text-decoration-none text-light">Entrar</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contato</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope me-2"></i> contato@pethaven.com.br</li>
              <li><i className="bi bi-phone me-2"></i> (11) 95555-1234</li>
              <li><i className="bi bi-geo-alt me-2"></i> Rua da Adoção, 123 - São Paulo</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} PetHaven. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
