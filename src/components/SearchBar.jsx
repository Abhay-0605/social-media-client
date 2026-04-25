// src/components/SearchBar.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Paper,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    InputAdornment,
    ClickAwayListener
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchResults } = useSelector(state => state.users);
    const results = searchResults || [];
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length >= 2) {
            dispatch(searchUsers(value));
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
        setQuery("");
        setShowResults(false);
    };

    return (
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
            <Box sx={{ position: "relative", width: "100%", maxWidth: 400 }}>
                {/* Search Input */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Users search karo..."
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => query.length >= 2 && setShowResults(true)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 5, background: "#f0f2f5" }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                    }}
                />

                {/* Results Dropdown */}
                {showResults && results.length > 0 && (
                    <Paper
                        elevation={4}
                        sx={{
                            position: "absolute",
                            top: "110%",
                            left: 0,
                            right: 0,
                            borderRadius: 2,
                            zIndex: 100,
                            maxHeight: 300,
                            overflow: "auto"
                        }}
                    >
                        <List disablePadding>
                            {results.map((result, index) => (
                                <ListItem
                                    key={result._id}
                                    onClick={() => handleUserClick(result._id)}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": { background: "#f0f2f5" },
                                        borderBottom: index !== results.length - 1
                                            ? "1px solid #eee"
                                            : "none"
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={result.profilePic}
                                            sx={{
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                width: 36,
                                                height: 36
                                            }}
                                        >
                                            {result.username?.[0]?.toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight="bold" fontSize={14}>
                                                @{result.username}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}

                {/* No Results */}
                {showResults && query.length >= 2 && results.length === 0 && (
                    <Paper
                        elevation={4}
                        sx={{ position: "absolute", top: "110%", left: 0, right: 0, borderRadius: 2, zIndex: 100 }}
                    >
                        <Typography textAlign="center" color="text.secondary" py={2}>
                            Koi user nahi mila! 🔍
                        </Typography>
                    </Paper>
                )}
            </Box>
        </ClickAwayListener>
    );
}

export default SearchBar;