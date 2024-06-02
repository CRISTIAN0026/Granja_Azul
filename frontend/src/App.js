import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/Nav'; 
import Home from './components/home/Home';
import Chickens from './components/chickens/Chickens';
import About from './components/about/About';
import Login from './components/login/Loging';
import RegistrationForm from "./components/login/CheckIn.jsx";
import FormChickens from "./components/chickens/FormChickens.jsx";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuestras-aves" element={<Chickens />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/crear-ave" element={<FormChickens />} />
      </Routes>
    </Router>
  );
};

export default App;


