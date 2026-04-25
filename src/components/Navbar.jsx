// src/components/Navbar.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import SearchBar from "./SearchBar";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    InputBase
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    // Profile menu
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        dispatch(logoutUser());
        handleMenuClose();
    };

    const handleProfile = () => {
        navigate(`/profile/${user._id}`);
        handleMenuClose();
    };

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                background: "white",
                color: "black",
                borderBottom: "1px solid #eee"
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", maxWidth: 1100, width: "100%", mx: "auto" }}>

                {/* Logo */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: 24
                    }}
                >
                    SocialApp
                </Typography>
                <Box sx={{ flex: 1, mx: 3, display: "flex", justifyContent: "center" }}>
                    <SearchBar />
                </Box>

               

                {/* Right Side */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                    {/* Home Button */}
                    <IconButton
                        component={Link}
                        to="/"
                        sx={{ color: "black" }}
                    >
                        <HomeIcon />
                    </IconButton>

                    {/* Profile Avatar — click pe menu */}
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
                        <Avatar
                            src={user?.profilePic}
                            alt={user?.username}
                            sx={{
                                width: 36,
                                height: 36,
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                cursor: "pointer"
                            }}
                        >
                            {user?.username?.[0]?.toUpperCase()}
                        </Avatar>
                    </IconButton>

                    {/* Dropdown Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        PaperProps={{
                            elevation: 3,
                            sx: { borderRadius: 2, minWidth: 180, mt: 1 }
                        }}
                    >
                        {/* User Info */}
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography fontWeight="bold">@{user?.username}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user?.email}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Profile */}
                        <MenuItem onClick={handleProfile} sx={{ gap: 1, py: 1.5 }}>
                            <PersonIcon fontSize="small" color="action" />
                            My Profile
                        </MenuItem>

                        {/* Logout */}
                        <MenuItem
                            onClick={handleLogout}
                            sx={{ gap: 1, py: 1.5, color: "error.main" }}
                        >
                            <LogoutIcon fontSize="small" />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;