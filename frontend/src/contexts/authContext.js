import React, { createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodeToken = jwtDecode(localStorage.getItem("token"));

  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodeToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api.defaults.headers.common["Content-Type"] = "application/json";
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}


if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function setAuthToken(token) {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.defaults.headers.common["Content-Type"] = "application/json";
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    setAuthToken(userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider, api };
