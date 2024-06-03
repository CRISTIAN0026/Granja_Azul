import { useContext } from "react";
import CartContext from "./CartContext";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const addItem = async (item) => {
    dispatch({ type: "ADD_ITEM", item });

    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    return response;
  };

  const removeItem = async (itemId) => {
    dispatch({ type: "REMOVE_ITEM", itemId });

    const response = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
      method: "DELETE",
    });
    return response;
  };

  return {
    cartItems: state.items,
    addItem,
    removeItem,
  };
}
