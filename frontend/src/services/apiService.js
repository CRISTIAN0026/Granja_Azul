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


export const getCartByUserId = async (userId) => {
  try {

    const response = await api.get(`shopping/cart/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error obteniendo el carrito:", error);
    return false;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await api.post(
      "payment/create",
      paymentData
    );
    console.log("Pago creado:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear el pago:",
      error.response ? error.response.data : error.message
    );
  }
};


export const getAllPayments = async () => {
  try {
    const response = await api.get(`payment/get`);
    console.log("Todos los pagos:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener todos los pagos:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getPaymentsByUser = async () => {
  try {
    const response = await api.get(
      `payment/user`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los pagos del usuario:",
      error.response ? error.response.data : error.message
    );
  }
};