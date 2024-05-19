import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export const getProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/products`);
      
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const registerUser = async ({ username, email, password, type }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}user/register`, {
      username,
      email,
      password,
      type,
    });

    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    return false;
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}user/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    return false;
  }
};

