import React, { useEffect, useState } from "react";
import { getCartByUserId } from "../../services/apiService.js"; 
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";

const CartIconComponent = ({ userId }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
        const data = await getCartByUserId(userId);

      if (data && data.items) {
        setCartItemCount(data.items.length);
      }
    };

    fetchCart();
  }, [userId]);

    return (
      <Link href="/cart">
        <Badge badgeContent={cartItemCount} color="error">
          <ShoppingCartIcon sx={{ width: "40px", height: "40px" }} />
        </Badge>
      </Link>
    );
};

export default CartIconComponent;