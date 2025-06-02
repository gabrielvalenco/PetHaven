import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    size: '',
    gender: '',
    search: '',
    available: true
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAnimals();
  }, [filters, page]);

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      // Usar URL completo para evitar problemas com o proxy
      let url = `http://localhost:8000/api/animals/?page=${page}`;
      
      if (filters.search) {
        url += `&search=${filters.search}`;
      }
      
      if (filters.type) {
        url += `&type=${filters.type}`;
      }
      
      if (filters.size) {
        url += `&size=${filters.size}`;
      }
      
      if (filters.gender) {
        url += `&gender=${filters.gender}`;
      }
      
      if (filters.available) {
        url += '&is_available=true';
      }
      
      const response = await axios.get(url);
      setAnimals(response.data.results || []);
      
      // Calculate total pages
      const count = response.data.count || 0;
      const pageSize = 10; // Assuming 10 items per page
      setTotalPages(Math.ceil(count / pageSize));
    } catch (err) {
      setError('Falha ao buscar animais. Por favor, tente novamente mais tarde.');
      console.error('Error fetching animals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(1); // Reset to first page when changing filters
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setPage(1); // Reset to first page when searching
  };

  const handleAvailableChange = (e) => {
    setFilters({ ...filters, available: e.target.checked });
    setPage(1); // Reset to first page when changing availability
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Encontre Seu Companheiro Perfeito</h1>
      
      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4} className="mb-3 mb-md-0">
              <InputGroup>
                <Form.Control
                  placeholder="Buscar por nome ou raça..."
                  value={filters.search}
                  onChange={handleSearchChange}
                />
                <Button variant="primary" onClick={() => fetchAnimals()}>
                  Buscar
                </Button>
              </InputGroup>
            </Col>
            <Col md={8}>
              <Row>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos os Tipos</option>
                      <option value="dog">Cães</option>
                      <option value="cat">Gatos</option>
                      <option value="other">Outros</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group>
                    <Form.Select
                      name="size"
                      value={filters.size}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos os Tamanhos</option>
                      <option value="small">Pequeno</option>
                      <option value="medium">Médio</option>
                      <option value="large">Grande</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group>
                    <Form.Select
                      name="gender"
                      value={filters.gender}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos os Gêneros</option>
                      <option value="male">Macho</option>
                      <option value="female">Fêmea</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      id="available-only"
                      label="Disponível"
                      checked={filters.available}
                      onChange={handleAvailableChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <p className="text-danger">{error}</p>
          <Button variant="primary" onClick={fetchAnimals}>Tentar Novamente</Button>
        </div>
      ) : animals.length === 0 ? (
        <div className="text-center my-5">
          <h3>Nenhum animal encontrado com esses critérios</h3>
          <p>Tente ajustar seus filtros ou termos de busca</p>
        </div>
      ) : (
        <>
          <Row>
            {animals.map(animal => (
              <Col key={animal.id} md={4} lg={3} className="mb-4">
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
                      <small className="text-dark">
                        {animal.type_display} • {animal.gender_display}
                      </small>
                    </Card.Text>
                    <Card.Text className="mb-2 text-dark">
                      {animal.breed} • {animal.age} meses
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-dark">{animal.ngo_name}</small>
                      <Button 
                        as={Link} 
                        to={`/animals/${animal.id}`} 
                        variant="outline-primary" 
                        size="sm"
                      >
                        Ver Detalhes
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
                Anterior
              </Button>
              <div className="d-flex align-items-center mx-3">
                Página {page} de {totalPages}
              </div>
              <Button
                variant="outline-primary"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default AnimalList;
