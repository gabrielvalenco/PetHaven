import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 2rem 0 1rem;
  margin-top: auto;
`;

const FooterTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1.2rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background-color: var(--primary);
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: var(--footer-text);
  text-decoration: none !important;
  transition: var(--transition-medium);
  display: inline-block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: var(--primary);
    transform: translateX(5px);
    text-decoration: none !important;
  }
`;

const ContactItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: var(--primary);
  }
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--footer-text);
  margin-right: 10px;
  transition: var(--transition-medium);
  font-size: 1.2rem;
  text-decoration: none !important;
  
  &:hover {
    background-color: var(--primary);
    color: white;
    transform: translateY(-3px);
    text-decoration: none !important;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <FooterTitle>PetHaven</FooterTitle>
            <p className="text-secondary mb-3">
              Conectando lares amorosos com animais que precisam.
              <br />
              Todo pet merece um lar para sempre.
            </p>
            <div className="d-flex mt-3">
              <SocialIcon href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </SocialIcon>
              <SocialIcon href="#" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </SocialIcon>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <FooterTitle>Links Rápidos</FooterTitle>
            <ul className="list-unstyled">
              <li><FooterLink to="/">Início</FooterLink></li>
              <li><FooterLink to="/animals">Animais</FooterLink></li>
              <li><FooterLink to="/ngos">ONGs</FooterLink></li>
              <li><FooterLink to="/login">Entrar</FooterLink></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <FooterTitle>Adoção</FooterTitle>
            <ul className="list-unstyled">
              <li><FooterLink to="/animals">Como adotar</FooterLink></li>
              <li><FooterLink to="/ngos">Parceiros</FooterLink></li>
              <li><FooterLink to="/">Doe</FooterLink></li>
              <li><FooterLink to="/">Voluntariado</FooterLink></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <FooterTitle>Contato</FooterTitle>
            <ul className="list-unstyled">
              <ContactItem>
                <i className="bi bi-envelope-fill"></i> contato@pethaven.com.br
              </ContactItem>
              <ContactItem>
                <i className="bi bi-telephone-fill"></i> (11) 95555-1234
              </ContactItem>
              <ContactItem>
                <i className="bi bi-geo-alt-fill"></i> Rua da Adoção, 123 - São Paulo
              </ContactItem>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} PetHaven. Todos os direitos reservados.</p>
        </div>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
