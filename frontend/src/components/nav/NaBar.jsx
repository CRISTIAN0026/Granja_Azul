import React, { useContext } from "react";
import { Box, Link, Button } from "@mui/material";
import { AuthContext } from "../../contexts/authContext.js";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
        {user ? (
          <>
            <Button style={{ textDecoration: "none" }} onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              Login
            </Link>
            <Link href="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default NavBar;
