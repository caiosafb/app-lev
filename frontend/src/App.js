import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/* components */
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';
import ProtectedRoute from './components/ProtectedeRoute';

/* pages */
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/User/Home';

/* context */
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Routes>
          {/* Rota para página de Login */}
          <Route 
            path="/login" 
            element={
              <Container backgroundImage="login">
                <Login />
              </Container>
            } 
          />
          
          {/* Rota para página de Registro */}
          <Route 
            path="/register" 
            element={
              <Container backgroundImage="register">
                <Register />
              </Container>
            } 
          />

          {/* Rota protegida para a página Home */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Container backgroundImage="home">
                  <Home />
                </Container>
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
