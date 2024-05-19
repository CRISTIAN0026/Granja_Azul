const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export const getProducts = async () => {
    try {
      console.log(API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/api/products`);
      console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
