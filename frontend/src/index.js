import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "../src/contexts/authContext.js";
import { CartProvider } from "../src/contexts/CartContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
