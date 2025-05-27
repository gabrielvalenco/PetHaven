import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedAnimals = async () => {
      try {
        const response = await axios.get('/api/animals/?is_available=true&limit=6');
        setFeaturedAnimals(response.data.results || []);
      } catch (error) {
        console.error('Error fetching featured animals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedAnimals();
  }, []);

  return (
    <Container>
      {/* Hero Section */}
      <div className="py-5 mb-5 bg-light rounded-3">
        <Container>
          <Row>
            <Col md={6} className="d-flex flex-column justify-content-center">
              <h1 className="display-4 fw-bold">Find Your Forever Friend</h1>
              <p className="lead">
                PetHaven connects loving homes with animals in need of adoption.
                Browse our collection of adorable pets waiting for a second chance.
              </p>
              <div>
                <Button 
                  as={Link} 
                  to="/animals" 
                  variant="primary" 
                  size="lg" 
                  className="me-2"
                >
                  Browse Animals
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="outline-primary" 
                  size="lg"
                >
                  Sign Up
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
      </div>

      {/* Featured Animals Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Featured Pets</h2>
        <Row>
          {loading ? (
            <p className="text-center">Loading featured pets...</p>
          ) : featuredAnimals.length > 0 ? (
            featuredAnimals.map(animal => (
              <Col key={animal.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={animal.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={animal.name}
                    className="pet-image"
                  />
                  <Card.Body>
                    <Card.Title>{animal.name}</Card.Title>
                    <Card.Text>
                      {animal.breed} • {animal.age} months old
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/animals/${animal.id}`} 
                      variant="outline-primary"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No featured pets available at the moment.</p>
          )}
        </Row>
        <div className="text-center mt-4">
          <Button as={Link} to="/animals" variant="primary">
            View All Animals
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-5 py-5 bg-light rounded">
        <h2 className="text-center mb-4">How It Works</h2>
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <h3 className="mb-0">1</h3>
            </div>
            <h4>Browse Animals</h4>
            <p>Search through our collection of animals based on type, breed, age, and size.</p>
          </Col>
          <Col md={4} className="mb-4">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <h3 className="mb-0">2</h3>
            </div>
            <h4>Request Adoption</h4>
            <p>Find your perfect companion and submit an adoption request.</p>
          </Col>
          <Col md={4} className="mb-4">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <h3 className="mb-0">3</h3>
            </div>
            <h4>Welcome Home</h4>
            <p>Once approved, welcome your new family member to their forever home!</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
