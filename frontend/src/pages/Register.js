import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });
  const [validated, setValidated] = useState(false);
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    if (formData.password !== formData.password2) {
      alert('Passwords do not match');
      return;
    }
    
    // Remove the password2 field before sending to API
    const userData = {...formData};
    delete userData.password2;
    
    const success = await register(userData);
    if (success) {
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>Criar Conta</h2>
                <p className="text-muted">Junte-se ao PetHaven e encontre seu companheiro perfeito</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Nome de Usuário</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Escolha um nome de usuário"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, escolha um nome de usuário.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, digite um email válido.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="first_name">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="Digite seu nome"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, digite seu nome.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="last_name">
                      <Form.Label>Sobrenome</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        placeholder="Digite seu sobrenome"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, digite seu sobrenome.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Crie uma senha"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                      />
                      <Form.Control.Feedback type="invalid">
                        A senha deve ter pelo menos 8 caracteres.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="password2">
                      <Form.Label>Confirmar Senha</Form.Label>
                      <Form.Control
                        type="password"
                        name="password2"
                        placeholder="Confirme sua senha"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, confirme sua senha.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Criando Conta...' : 'Criar Conta'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p>
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Entrar
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

export default Register;
