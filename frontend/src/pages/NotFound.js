import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="mb-4">Página Não Encontrada</h2>
          <p className="lead mb-5">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
            <Button as={Link} to="/" variant="primary" size="lg">
              Ir para a Página Inicial
            </Button>
            <Button as={Link} to="/animals" variant="outline-primary" size="lg">
              Ver Animais
            </Button>
          </div>
          <div className="mt-5">
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
              alt="Sad puppy" 
              className="img-fluid rounded" 
              style={{ maxHeight: '300px' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
