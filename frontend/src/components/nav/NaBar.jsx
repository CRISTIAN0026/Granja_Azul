import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { AuthContext } from "../../contexts/authContext.js";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const onLogout = () => {
    logout();
    navigate("/");
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


const settings = ["Cerrar sesión"];


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "center" }}>
        {user ? (
          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Box>
                <Tooltip title="Pulse click">
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={handleOpenUserMenu}
                  >
                    <Avatar alt={user.email} />
                  </IconButton>
                  <Typography textAlign="center">{user?.email}</Typography>
                </Tooltip>
                <Button variant="contained" href="/crear-ave">
                  Publicar productos
                </Button>
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={onLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              href="/login"
              style={{
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              Ingresar
            </Button>
            <Button href="/register" style={{ textDecoration: "none" }}>
              Registrarse
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default NavBar;
