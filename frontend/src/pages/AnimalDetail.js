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
      setAdoptionMessage('Sua solicitação de adoção foi enviada com sucesso! A ONG irá analisar seu pedido em breve.');
    } catch (err) {
      setAdoptionMessage('Falha ao enviar solicitação de adoção. Por favor, tente novamente mais tarde.');
      console.error('Error submitting adoption request:', err);
    } finally {
      setAdoptionLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !animal) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          {error || 'Animal não encontrado'}
        </Alert>
        <Button as={Link} to="/animals" variant="primary" className="mt-3">
          Voltar para Animais
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
              <Badge bg="success" className="p-2">Disponível</Badge>
            ) : (
              <Badge bg="danger" className="p-2">Indisponível</Badge>
            )}
          </div>
          
          <p className="lead mb-4">{animal.breed}</p>
          
          <Row className="mb-4">
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.type_display}</p>
                <small>Tipo</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.age}</p>
                <small>Meses</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.gender_display}</p>
                <small>Gênero</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center p-2 bg-light rounded mb-2">
                <p className="mb-0 fw-bold">{animal.size_display}</p>
                <small>Tamanho</small>
              </div>
            </Col>
          </Row>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Sobre {animal.name}</Card.Title>
              <Card.Text>
                {animal.description}
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Informações da ONG</Card.Title>
              <Card.Text>
                <strong>Organização:</strong> {animal.ngo_name}<br />
                {/* We could add more NGO details here when available */}
              </Card.Text>
              <Button 
                as={Link} 
                to={`/ngos/${animal.ngo}`} 
                variant="outline-primary" 
                size="sm"
              >
                Ver Detalhes da ONG
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
                    Status da Adoção: {adoptionStatus === 'pending' ? 'Pendente' : 
                      adoptionStatus === 'approved' ? 'Aprovada' : 
                      adoptionStatus === 'rejected' ? 'Rejeitada' : 
                      adoptionStatus === 'cancelled' ? 'Cancelada' : adoptionStatus}
                  </Alert.Heading>
                  {adoptionStatus === 'pending' && (
                    <p>Sua solicitação de adoção está sendo analisada pela ONG.</p>
                  )}
                  {adoptionStatus === 'approved' && (
                    <p>Parabéns! Sua solicitação de adoção foi aprovada. A ONG entrará em contato em breve.</p>
                  )}
                  {adoptionStatus === 'rejected' && (
                    <p>Infelizmente, sua solicitação de adoção não foi aprovada. Por favor, entre em contato com a ONG para mais informações.</p>
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
                  {adoptionLoading ? 'Enviando Solicitação...' : 'Solicitar Adoção'}
                </Button>
              )}
            </div>
          ) : (
            <Alert variant="secondary">
              Este animal não está mais disponível para adoção.
            </Alert>
          )}
        </Col>
      </Row>
      
      <div className="mt-4">
        <Button as={Link} to="/animals" variant="outline-primary">
          Voltar para Todos os Animais
        </Button>
      </div>
    </Container>
  );
};

export default AnimalDetail;
