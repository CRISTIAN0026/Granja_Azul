import { api } from "../contexts/authContext.js"

export const getProducts = async () => {
  try {
    const response = await api.get(`api/products`);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const postProduct = async (formData) => {
  try {
    const response = await api.post(`api/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const registerUser = async ({ username, email, password, type }) => {
  try {
    const response = await api.post(`user/register`, {
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
    const response = await api.post(`user/login`, {
      email,
      password,
    });

    

    return response.data;
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    return false;
  }
};


