import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const NGODetail = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGODetails = async () => {
      try {
        // Fetch NGO details - usar URL completo para evitar problemas com o proxy
        const ngoResponse = await axios.get(`http://localhost:8000/api/ngos/${id}/`);
        setNgo(ngoResponse.data);
        
        // Fetch animals associated with this NGO - usar URL completo para evitar problemas com o proxy
        const animalsResponse = await axios.get(`http://localhost:8000/api/animals/?ngo=${id}`);
        setAnimals(animalsResponse.data.results || []);
      } catch (err) {
        setError('Falha ao carregar detalhes da ONG. Por favor, tente novamente mais tarde.');
        console.error('Error fetching NGO details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNGODetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !ngo) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          {error || 'NGO not found'}
        </Alert>
        <Button as={Link} to="/ngos" variant="primary" className="mt-3">
          Back to NGOs
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col lg={8}>
          <h1 className="mb-3">{ngo.name}</h1>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="card-title">About Us</h4>
              <p className="card-text">
                {ngo.description || 'This organization is dedicated to helping animals find their forever homes.'}
              </p>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <h4 className="card-title">Contact Information</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Email:</strong> {ngo.email}
                </li>
                {ngo.phone && (
                  <li className="mb-2">
                    <strong>Phone:</strong> {ngo.phone}
                  </li>
                )}
                <li className="mb-2">
                  <strong>Location:</strong> {ngo.city}
                </li>
                {ngo.address && (
                  <li className="mb-2">
                    <strong>Address:</strong> {ngo.address}
                  </li>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="card-title mb-3">Organization Info</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>City:</span>
                <span className="fw-bold">{ngo.city}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Animals Available:</span>
                <span className="fw-bold">{animals.filter(a => a.is_available).length}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Animals:</span>
                <span className="fw-bold">{animals.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Member Since:</span>
                <span className="fw-bold">
                  {new Date(ngo.created_at).toLocaleDateString()}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Animals from this NGO */}
      <h2 className="mt-5 mb-4">Animals from {ngo.name}</h2>
      {animals.length === 0 ? (
        <Alert variant="info">
          No animals currently listed from this organization.
        </Alert>
      ) : (
        <Row>
          {animals.slice(0, 8).map(animal => (
            <Col key={animal.id} md={3} sm={6} className="mb-4">
              <Card className="card-pet h-100">
                <Card.Img 
                  variant="top" 
                  src={animal.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={animal.name}
                  className="pet-image"
                />
                <Card.Body>
                  <Card.Title>{animal.name}</Card.Title>
                  <Card.Text className="mb-1">
                    <small className="text-muted">
                      {animal.type_display} • {animal.breed}
                    </small>
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    {animal.is_available ? (
                      <small className="text-success">Available</small>
                    ) : (
                      <small className="text-danger">Adopted</small>
                    )}
                    <Button 
                      as={Link} 
                      to={`/animals/${animal.id}`} 
                      variant="outline-primary" 
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
      {animals.length > 8 && (
        <div className="text-center mt-3">
          <Button 
            as={Link} 
            to={`/animals?ngo=${ngo.id}`}
            variant="primary"
          >
            View All Animals
          </Button>
        </div>
      )}
      
      <div className="mt-5">
        <Button as={Link} to="/ngos" variant="outline-primary">
          Back to All NGOs
        </Button>
      </div>
    </Container>
  );
};

export default NGODetail;
