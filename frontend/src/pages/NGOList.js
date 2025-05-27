import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNGOs();
  }, [page, cityFilter]);

  useEffect(() => {
    // Fetch unique cities for filter
    const fetchCities = async () => {
      try {
        const response = await axios.get('/api/ngos/');
        const uniqueCities = [...new Set(response.data.results.map(ngo => ngo.city))];
        setCities(uniqueCities.sort());
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const fetchNGOs = async () => {
    setLoading(true);
    try {
      let url = `/api/ngos/?page=${page}`;
      
      if (cityFilter) {
        url += `&city=${cityFilter}`;
      }
      
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      
      const response = await axios.get(url);
      setNgos(response.data.results || []);
      
      // Calculate total pages
      const count = response.data.count || 0;
      const pageSize = 10; // Assuming 10 items per page
      setTotalPages(Math.ceil(count / pageSize));
    } catch (err) {
      setError('Failed to fetch NGOs. Please try again later.');
      console.error('Error fetching NGOs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    fetchNGOs();
  };

  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
    setPage(1); // Reset to first page when changing city filter
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Partner Organizations</h1>
      <p className="lead mb-4">
        These NGOs work tirelessly to rescue, rehabilitate, and find loving homes for animals in need.
      </p>
      
      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    placeholder="Search NGOs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Select
                  value={cityFilter}
                  onChange={handleCityChange}
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <p className="text-danger">{error}</p>
          <Button variant="primary" onClick={fetchNGOs}>Try Again</Button>
        </div>
      ) : ngos.length === 0 ? (
        <div className="text-center my-5">
          <h3>No NGOs found matching your criteria</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <>
          <Row>
            {ngos.map(ngo => (
              <Col key={ngo.id} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fs-4">{ngo.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ngo.city}
                    </Card.Subtitle>
                    <Card.Text>
                      {ngo.description ? (
                        ngo.description.substring(0, 150) + (ngo.description.length > 150 ? '...' : '')
                      ) : (
                        "This organization is dedicated to helping animals find their forever homes."
                      )}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Text className="mb-0">
                        <small className="text-muted">
                          <i className="bi bi-envelope me-1"></i> {ngo.email}
                        </small>
                      </Card.Text>
                      <Button 
                        as={Link} 
                        to={`/ngos/${ngo.id}`} 
                        variant="outline-primary"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="outline-primary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="me-2"
              >
                Previous
              </Button>
              <div className="d-flex align-items-center mx-3">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline-primary"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default NGOList;
