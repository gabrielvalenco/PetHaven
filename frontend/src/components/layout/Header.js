import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import styled from 'styled-components';

// Styled components for the header
const StyledNavbar = styled(Navbar)`
  padding: 0.6rem 0;
  transition: var(--transition-medium);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--navbar-bg);
  border-bottom: 1px solid var(--border);
`;

const StyledNavLink = styled(Nav.Link)`
  position: relative;
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  font-weight: 600;
  color: var(--text-secondary) !important;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary) !important;
  }
  
  &.active {
    color: var(--primary) !important;
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    background-color: var(--primary);
    border-radius: 50%;
  }
`;

const NavbarBrand = styled(Navbar.Brand)`
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  color: var(--primary) !important;
  letter-spacing: -0.5px;
  
  .brand-emoji {
    font-size: 1.8rem;
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover .brand-emoji {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ThemeToggleButton = styled.button`
  background: var(--bg-accent);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  margin-right: 1rem;
  color: var(--text);
  transition: var(--transition-medium);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--primary-light);
    transform: rotate(15deg);
    color: white;
  }
`;

const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Styled button components
const NavButton = styled(Button)`
  border-radius: 50px;
  padding: 0.4rem 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.btn-primary {
    background-color: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 2px 5px rgba(76, 175, 80, 0.3);
    
    &:hover {
      background-color: var(--primary-dark);
      border-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(76, 175, 80, 0.4);
    }
  }
  
  &.btn-outline-primary {
    color: var(--primary);
    border-color: var(--primary);
    
    &:hover {
      background-color: var(--primary);
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledNavbar expand="lg">
      <Container>
        <NavbarBrand as={Link} to="/">
          <span className="brand-emoji">🐾</span>
          PetHaven
        </NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <StyledNavLink as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>Início</StyledNavLink>
            <StyledNavLink as={Link} to="/animals" className={location.pathname.includes('/animals') ? 'active' : ''}>Animais</StyledNavLink>
            <StyledNavLink as={Link} to="/ngos" className={location.pathname.includes('/ngos') ? 'active' : ''}>ONGs</StyledNavLink>
            {isAuthenticated && (
              <StyledNavLink as={Link} to="/adoptions" className={location.pathname.includes('/adoptions') ? 'active' : ''}>Minhas Adoções</StyledNavLink>
            )}
          </Nav>
          <Nav className="d-flex align-items-center">
            <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </ThemeToggleButton>
            
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center me-3">
                  <UserAvatar>{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</UserAvatar>
                  <span className="fw-semibold">Olá, {user.username}</span>
                </Nav.Link>
                <NavButton 
                  variant="outline-primary" 
                  onClick={handleLogout}
                  size="sm"
                >
                  Sair
                </NavButton>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <NavButton 
                  variant="outline-primary" 
                  as={Link} 
                  to="/login"
                  size="sm"
                >
                  Entrar
                </NavButton>
                <NavButton 
                  variant="primary" 
                  as={Link} 
                  to="/register"
                  size="sm"
                >
                  Cadastrar
                </NavButton>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Header;
