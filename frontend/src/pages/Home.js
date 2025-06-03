import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import styled from 'styled-components';

// Note: Removed unused imports

// Componentes estilizados
const HeroSection = styled.div`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 4rem 0;
  border-radius: var(--radius-lg);
  margin-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const StyledCard = styled(Card)`
  border: none;
  transition: box-shadow 0.3s ease;
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-md);
  overflow: hidden;
  height: 100%;
  background-color: var(--card-bg);
  
  &:hover {
    box-shadow: var(--shadow-md);
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover .card-img-top {
    transform: scale(1.05);
  }
  
  .card-body {
    background-color: var(--card-bg);
    color: var(--text);
  }
`;

const StatsCounter = styled.div`
  text-align: center;
  background-color: var(--bg-accent);
  padding: 2rem 0;
  border-radius: var(--radius-md);
  margin: 3rem 0;
  box-shadow: var(--shadow-sm);
  
  .counter {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  .counter-title {
    color: var(--text);
    font-size: 1.2rem;
  }
`;

const Home = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedAnimals = async () => {
      try {
        // Usando nossa instância API personalizada
        const response = await api.get('/animals/', {
          params: { is_available: true, limit: 6 }
        });
        setFeaturedAnimals(response.data.results || []);
      } catch (error) {
        console.error('Error fetching featured animals:', error);
        // Adicionar mensagem de erro para o usuário sem exibir alert
        setFeaturedAnimals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedAnimals();
  }, []);

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection className="py-5 mb-5 rounded-3">
        <Container>
          <Row>
            <Col md={6} className="d-flex flex-column justify-content-center">
              <h1 className="display-4 fw-bold">Encontre Seu Amigo Para Sempre</h1>
              <p className="lead">
                PetHaven conecta lares amorosos com animais que precisam de adoção.
                Navegue em nossa coleção de pets adoráveis esperando por uma segunda chance.
              </p>
              <div className="btn-group-responsive mt-3">
                <Button 
                  as={Link} 
                  to="/animals" 
                  variant="light" 
                  size="lg" 
                  className="rounded-pill px-4 py-2 fw-bold"
                >
                  Ver Animais
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="light" 
                  size="lg"
                  className="rounded-pill px-4 py-2 fw-bold"
                >
                  Cadastre-se
                </Button>
              </div>
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded"
                    src="https://images.unsplash.com/photo-1544568100-847a948585b9"
                    alt="Dog"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded"
                    src="https://images.unsplash.com/photo-1573865526739-10659fec78a5"
                    alt="Cat"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </HeroSection>

      {/* Featured Animals Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Pets em Destaque</h2>
        <Row>
          {loading ? (
            <p className="text-center">Carregando pets em destaque...</p>
          ) : featuredAnimals.length > 0 ? (
            featuredAnimals.map(animal => (
              <Col key={animal.id} md={4} className="mb-4">
                <StyledCard className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={animal.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={animal.name}
                    className="pet-image"
                  />
                  <Card.Body>
                    <Card.Title>{animal.name}</Card.Title>
                    <Card.Text>
                      {animal.breed} • {animal.age} meses
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/animals/${animal.id}`} 
                      variant="outline-primary"
                    >
                      Ver Detalhes
                    </Button>
                  </Card.Body>
                </StyledCard>
              </Col>
            ))
          ) : (
            <p className="text-center">Não há pets em destaque disponíveis no momento.</p>
          )}
        </Row>
        <div className="text-center mt-4">
          <Button as={Link} to="/animals" variant="primary">
            Ver Todos os Animais
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-5 py-5 section-themed rounded">
        <h2 className="text-center mb-4">Como Funciona</h2>
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <h3 className="mb-0">1</h3>
            </div>
            <h4>Procure Animais</h4>
            <p>Pesquise em nossa coleção de animais por tipo, raça, idade e tamanho.</p>
          </Col>
          <Col md={4} className="mb-4">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <h3 className="mb-0">2</h3>
            </div>
            <h4>Solicite Adoção</h4>
            <p>Encontre seu companheiro perfeito e envie uma solicitação de adoção.</p>
          </Col>
          <Col md={4} className="mb-4">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <h3 className="mb-0">3</h3>
            </div>
            <h4>Bem-vindo ao Lar</h4>
            <p>Uma vez aprovado, dê as boas-vindas ao novo membro da família ao seu lar para sempre!</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
