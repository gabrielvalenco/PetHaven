import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Estilos globais
import GlobalStyles from './styles/GlobalStyles';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimalList from './pages/AnimalList';
import AnimalDetail from './pages/AnimalDetail';
import AdoptionList from './pages/AdoptionList';
import NGOList from './pages/NGOList';
import NGODetail from './pages/NGODetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const location = useLocation();
  
  // Inicializar AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <GlobalStyles />
      <Header />
      <Container className="flex-grow-1 py-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/animals" element={<AnimalList />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/ngos" element={<NGOList />} />
          <Route path="/ngos/:id" element={<NGODetail />} />
          
          {/* Protected Routes */}
          <Route 
            path="/adoptions" 
            element={
              <ProtectedRoute>
                <AdoptionList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
