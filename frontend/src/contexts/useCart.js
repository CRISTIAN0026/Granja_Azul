import { useContext } from "react";
import CartContext from "./CartContext";
import { api } from "./authContext.js";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const addItem = async (item) => {
    dispatch({ type: "ADD_ITEM", item });

    const response = await api.post(`${API_BASE_URL}shopping/cart`, item);

    return response;
  };

  const removeItem = async (itemId) => {
    dispatch({ type: "REMOVE_ITEM", itemId });

    const response = await api.delete(`${API_BASE_URL}shopping/cart/${itemId}`, {
      method: "DELETE",
    });
    return response;
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });

    const response = await api.post(`${API_BASE_URL}shopping/clear`);
    return response;
  };

  return {
    cartItems: state.items,
    addItem,
    removeItem,
    clearCart
  };
}
