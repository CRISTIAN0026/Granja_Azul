import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/Nav'; 
import Home from './components/home/Home';
import Chickens from './components/chickens/Chickens';
import About from './components/about/About';
import Login from './components/login/Loging';
import RegistrationForm from "./components/login/CheckIn.jsx";
import FormChickens from "./components/chickens/FormChickens.jsx";
import { AuthContext } from './contexts/authContext.js';
import CartItemsComponent from './components/cart/CartItemsComponent.jsx';


const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuestras-aves" element={<Chickens />} />
        <Route path="/nosotros" element={<About />} />
        <Route
          path="/login"
          element={user ? <h1>Ya usted inicio sesión</h1> : <Login />}
        />
        <Route
          path="/register"
          element={
            user ? <h1>Ya usted esta registrado</h1> : <RegistrationForm />
          }
        />
        <Route
          path="/crear-ave"
          element={
            user?.type === "admin" ? (
              <FormChickens />
            ) : (
              <h1>Usted no cuenta con acceso</h1>
            )
          }
        />
        <Route path="/cart" element={<CartItemsComponent />} />
      </Routes>
    </Router>
  );
};

export default App;


