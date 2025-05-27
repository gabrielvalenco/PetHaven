import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    const success = await login(username, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>Bem-vindo de Volta</h2>
                <p className="text-muted">Entre na sua conta PetHaven</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nome de Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, digite seu nome de usuário.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, digite sua senha.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p>
                  Não tem uma conta?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
