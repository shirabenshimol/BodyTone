import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:8080/Users/getByCode/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUserName(data.name || "");
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    if (token) {
      fetchUserName();
    }
  }, [token, userId]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserName("");
    setAnchorEl(null);
    navigate("/login");
  };

  const handleProfile = () => {
  
    navigate("/profile");
  };

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1c2431', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#00C896', cursor: 'pointer' }} onClick={() => navigate('/')}>Body</span>Tune
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/classes')}>Classes</Button>
          <Button color="inherit">Membership</Button>
          <Button color="inherit">Contact</Button>
        </Box>

        {token ? (
          <>
            <Avatar
              sx={{ bgcolor: '#00C896', cursor: 'pointer' }}
              onClick={handleAvatarClick}
              variant="circular"
            >
              {firstLetter?.trim() !== "" ? firstLetter : "?"}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>

              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                profile
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{ backgroundColor: '#00C896', color: '#fff', borderRadius: 2 }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
