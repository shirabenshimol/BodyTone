import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:8080";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = useSelector((state: any) => state.user.user?.code);

  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${API_BASE}/Users/getByCode/${userId}`);
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
        {/* רק הלוגו בלי טקסט */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <img
            src="/images/image (14).png"
            alt="BodyTune Logo"
            style={{ height: 'auto', maxHeight: 40 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/classes')}>Classes</Button>
          <Button color="inherit" onClick={() => navigate('/membershipPlans')}>Membership</Button>
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
                Profile
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
