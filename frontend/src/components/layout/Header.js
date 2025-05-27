import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <span className="me-2">🐾</span>
          PetHaven
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            <Nav.Link as={Link} to="/animals">Animais</Nav.Link>
            <Nav.Link as={Link} to="/ngos">ONGs</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/adoptions">Minhas Adoções</Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile" className="me-2">
                  Olá, {user.username}
                </Nav.Link>
                <Button 
                  variant="outline-primary" 
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">Entrar</Nav.Link>
                <Button 
                  variant="primary" 
                  as={Link} 
                  to="/register"
                >
                  Cadastrar
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
