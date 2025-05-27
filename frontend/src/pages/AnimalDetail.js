import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState(null);
  const [adoptionMessage, setAdoptionMessage] = useState('');
  const [adoptionLoading, setAdoptionLoading] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`/api/animals/${id}/`);
        setAnimal(response.data);
        
        // If user is authenticated, check if they've already requested adoption
        if (isAuthenticated) {
          try {
            const adoptionsResponse = await axios.get(`/api/adoptions/?animal=${id}&user=${user.id}`);
            if (adoptionsResponse.data.results.length > 0) {
              setAdoptionStatus(adoptionsResponse.data.results[0].status);
            }
          } catch (err) {
            console.error('Error checking adoption status:', err);
          }
        }
      } catch (err) {
        setError('Failed to load animal details. Please try again later.');
        console.error('Error fetching animal details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id, isAuthenticated, user]);

  const handleAdoptRequest = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/animals/${id}` } });
      return;
    }
    
    setAdoptionLoading(true);
    try {
      const response = await axios.post('/api/adoptions/', {
        animal: id,
        user: user.id,
        status: 'pending'
      });
      
      setAdoptionStatus('pending');
      setAdoptionMessage('Your adoption request has been submitted successfully! The NGO will review your application soon.');
    } catch (err) {
      setAdoptionMessage('Failed to submit adoption request. Please try again later.');
      console.error('Error submitting adoption request:', err);
    } finally {
      setAdoptionLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !animal) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          {error || 'Animal not found'}
        </Alert>
        <Button as={Link} to="/animals" variant="primary" className="mt-3">
          Back to Animals
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {/* Adoption Message */}
      {adoptionMessage && (
        <Alert 
          variant={adoptionStatus === 'pending' ? 'success' : 'danger'} 
          onClose={() => setAdoptionMessage('')}
          dismissible
        >
          {adoptionMessage}
        </Alert>
      )}
      
      <Row>
        {/* Animal Image */}
        <Col lg={6} className="mb-4">
          <img
            src={animal.photo || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={animal.name}
            className="img-fluid rounded animal-detail-image w-100"
          />
        </Col>
        
        {/* Animal Details */}
        <Col lg={6}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>{animal.name}</h1>
            {animal.is_available ? (
              <Badge bg="success" className="p-2">Available</Badge>
            ) : (
              <Badge bg="danger" className="p-2">Not Available</Badge>
            )}
          </div>
          
          <p className="lead mb-4">{animal.breed}</p>
          
          <Row className="mb-4">
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.type_display}</p>
                <small>Type</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.age}</p>
                <small>Months</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.gender_display}</p>
                <small>Gender</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.size_display}</p>
                <small>Size</small>
              </div>
            </Col>
          </Row>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>About {animal.name}</Card.Title>
              <Card.Text>
                {animal.description}
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>NGO Information</Card.Title>
              <Card.Text>
                <strong>Organization:</strong> {animal.ngo_name}<br />
                {/* We could add more NGO details here when available */}
              </Card.Text>
              <Button 
                as={Link} 
                to={`/ngos/${animal.ngo}`} 
                variant="outline-primary" 
                size="sm"
              >
                View NGO Details
              </Button>
            </Card.Body>
          </Card>
          
          {/* Adoption Button/Status */}
          {animal.is_available ? (
            <div>
              {adoptionStatus ? (
                <Alert variant={
                  adoptionStatus === 'approved' ? 'success' : 
                  adoptionStatus === 'rejected' ? 'danger' : 
                  'warning'
                }>
                  <Alert.Heading>
                    Adoption Status: {adoptionStatus.charAt(0).toUpperCase() + adoptionStatus.slice(1)}
                  </Alert.Heading>
                  {adoptionStatus === 'pending' && (
                    <p>Your adoption request is currently being reviewed by the NGO.</p>
                  )}
                  {adoptionStatus === 'approved' && (
                    <p>Congratulations! Your adoption request has been approved. The NGO will contact you shortly.</p>
                  )}
                  {adoptionStatus === 'rejected' && (
                    <p>Unfortunately, your adoption request was not approved. Please contact the NGO for more information.</p>
                  )}
                </Alert>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  onClick={handleAdoptRequest}
                  disabled={adoptionLoading}
                >
                  {adoptionLoading ? 'Submitting Request...' : 'Request Adoption'}
                </Button>
              )}
            </div>
          ) : (
            <Alert variant="secondary">
              This animal is no longer available for adoption.
            </Alert>
          )}
        </Col>
      </Row>
      
      <div className="mt-4">
        <Button as={Link} to="/animals" variant="outline-primary">
          Back to All Animals
        </Button>
      </div>
    </Container>
  );
};

export default AnimalDetail;
