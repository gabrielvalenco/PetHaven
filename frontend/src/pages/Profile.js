import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tab, Nav } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [adoptions, setAdoptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Set initial profile data
      setProfileData({
        username: user.username || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
      });
      
      // Fetch user's adoptions and reviews
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const fetchUserData = async () => {
    setDataLoading(true);
    try {
      // Fetch adoptions - usar URL completo para evitar problemas com o proxy
      const adoptionsResponse = await axios.get(`http://localhost:8000/api/adoptions/?user=${user.id}`);
      setAdoptions(adoptionsResponse.data.results || []);
      
      // Fetch reviews - usar URL completo para evitar problemas com o proxy
      const reviewsResponse = await axios.get(`http://localhost:8000/api/reviews/?user=${user.id}`);
      setReviews(reviewsResponse.data.results || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Usar URL completo para evitar problemas com o proxy
      const response = await axios.put(`http://localhost:8000/api/users/${user.id}/`, profileData);
      setMessage({
        type: 'success',
        text: 'Perfil atualizado com sucesso!'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'danger',
        text: 'Falha ao atualizar o perfil. Por favor, tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    
    if (password.new_password !== password.confirm_password) {
      setMessage({
        type: 'danger',
        text: 'As novas senhas não coincidem.'
      });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Usar URL completo para evitar problemas com o proxy
      const response = await axios.post('http://localhost:8000/api/auth/password/change/', {
        old_password: password.current_password,
        new_password: password.new_password
      });
      
      setMessage({
        type: 'success',
        text: 'Senha atualizada com sucesso!'
      });
      
      // Clear password fields
      setPassword({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.detail || 'Falha ao atualizar a senha. Por favor, tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">
          You must be logged in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">My Profile</h1>
      
      <Tab.Container id="profile-tabs" defaultActiveKey="profile">
        <Row>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="text-center mb-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
                    <h2 className="mb-0">
                      {profileData.first_name.charAt(0) || profileData.username.charAt(0).toUpperCase()}
                    </h2>
                  </div>
                  <h5 className="mt-3 mb-0">{profileData.first_name} {profileData.last_name}</h5>
                  <p className="text-muted">{profileData.username}</p>
                </div>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">Profile Information</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="password">Change Password</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="adoptions">My Adoptions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reviews">My Reviews</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9}>
            <Card className="shadow-sm">
              <Card.Body>
                <Tab.Content>
                  {/* Profile Information Tab */}
                  <Tab.Pane eventKey="profile">
                    <h4 className="mb-4">Profile Information</h4>
                    {message.text && (
                      <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                        {message.text}
                      </Alert>
                    )}
                    <Form onSubmit={updateProfile}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              value={profileData.username}
                              onChange={handleProfileChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="first_name"
                              value={profileData.first_name}
                              onChange={handleProfileChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="last_name"
                              value={profileData.last_name}
                              onChange={handleProfileChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </Form>
                  </Tab.Pane>
                  
                  {/* Change Password Tab */}
                  <Tab.Pane eventKey="password">
                    <h4 className="mb-4">Change Password</h4>
                    {message.text && (
                      <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                        {message.text}
                      </Alert>
                    )}
                    <Form onSubmit={updatePassword}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="current_password"
                          value={password.current_password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="new_password"
                          value={password.new_password}
                          onChange={handlePasswordChange}
                          required
                          minLength={8}
                        />
                        <Form.Text className="text-muted">
                          Password must be at least 8 characters long.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirm_password"
                          value={password.confirm_password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </Form>
                  </Tab.Pane>
                  
                  {/* Adoptions Tab */}
                  <Tab.Pane eventKey="adoptions">
                    <h4 className="mb-4">My Adoption Requests</h4>
                    {dataLoading ? (
                      <div className="text-center my-5">
                        <Spinner animation="border" role="status" variant="primary">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : adoptions.length === 0 ? (
                      <Alert variant="info">
                        You haven't made any adoption requests yet.
                      </Alert>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Animal</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adoptions.map(adoption => (
                              <tr key={adoption.id}>
                                <td>
                                  {adoption.animal_details?.name} ({adoption.animal_details?.breed})
                                </td>
                                <td>
                                  <span className={`badge bg-${
                                    adoption.status === 'approved' ? 'success' :
                                    adoption.status === 'rejected' ? 'danger' :
                                    adoption.status === 'cancelled' ? 'secondary' : 'warning text-dark'
                                  }`}>
                                    {adoption.status_display || adoption.status}
                                  </span>
                                </td>
                                <td>
                                  {new Date(adoption.adoption_date).toLocaleDateString()}
                                </td>
                                <td>
                                  <Button
                                    href={`/animals/${adoption.animal}`}
                                    variant="outline-primary"
                                    size="sm"
                                  >
                                    View
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Tab.Pane>
                  
                  {/* Reviews Tab */}
                  <Tab.Pane eventKey="reviews">
                    <h4 className="mb-4">My Reviews</h4>
                    {dataLoading ? (
                      <div className="text-center my-5">
                        <Spinner animation="border" role="status" variant="primary">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : reviews.length === 0 ? (
                      <Alert variant="info">
                        You haven't submitted any reviews yet.
                      </Alert>
                    ) : (
                      <Row>
                        {reviews.map(review => (
                          <Col key={review.id} md={6} className="mb-3">
                            <Card>
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h5 className="mb-0">{review.animal_details?.name}</h5>
                                  <div>
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className="text-warning">
                                        {i < review.rating ? '★' : '☆'}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </Card.Subtitle>
                                <Card.Text>{review.comment}</Card.Text>
                                <Button
                                  href={`/animals/${review.animal}`}
                                  variant="outline-primary"
                                  size="sm"
                                >
                                  View Animal
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
