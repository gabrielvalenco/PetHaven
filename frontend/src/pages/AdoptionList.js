import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Badge, Spinner, Alert, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdoptionList = () => {
  const { user } = useContext(AuthContext);
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`/api/adoptions/?user=${user.id}`);
        setAdoptions(response.data.results || []);
      } catch (err) {
        setError('Failed to load your adoption requests. Please try again later.');
        console.error('Error fetching adoptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'cancelled':
        return <Badge bg="secondary">Cancelled</Badge>;
      case 'pending':
      default:
        return <Badge bg="warning" text="dark">Pending</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => window.location.reload()} variant="primary">
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">My Adoption Requests</h1>
      
      {adoptions.length === 0 ? (
        <Card className="text-center p-5 shadow-sm">
          <Card.Body>
            <h3 className="mb-3">You haven't made any adoption requests yet</h3>
            <p className="mb-4">Browse our available animals and submit an adoption request to get started.</p>
            <Button as={Link} to="/animals" variant="primary" size="lg">
              Find Your Pet
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-responsive">
          <Table hover className="shadow-sm">
            <thead className="bg-light">
              <tr>
                <th>Animal</th>
                <th>NGO</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.map(adoption => (
                <tr key={adoption.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={adoption.animal_details?.photo || 'https://via.placeholder.com/50?text=Pet'}
                        alt={adoption.animal_details?.name}
                        className="me-2 rounded"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div>
                        <div className="fw-bold">{adoption.animal_details?.name}</div>
                        <small className="text-muted">
                          {adoption.animal_details?.breed} ({adoption.animal_details?.age} months)
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{adoption.animal_details?.ngo_name}</td>
                  <td>{formatDate(adoption.adoption_date)}</td>
                  <td>{getStatusBadge(adoption.status)}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/animals/${adoption.animal}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      View Animal
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default AdoptionList;
