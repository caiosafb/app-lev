// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/login' element={<Container backgroundImage="login"><Login /></Container>} />
                <Route path='/register' element={<Container backgroundImage="register"><Register /></Container>} />
                <Route path='/' element={<Container backgroundImage="home"><Home /></Container>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
