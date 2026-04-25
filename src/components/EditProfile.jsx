// src/components/EditProfile.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/users/usersSlice";
import {
    Box,
    Button,
    TextField,
    Typography,
    Avatar,
    IconButton,
    CircularProgress,
    Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function EditProfile({ onClose }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [form, setForm] = useState({
        username: user.username || "",
        bio: user.bio || ""
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(user.profilePic || "");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setFile(selected);
        setPreview(URL.createObjectURL(selected));  // preview
    };

    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        if (file) formData.append("image", file);
        formData.append("username", form.username);
        formData.append("bio", form.bio);

        await dispatch(updateProfile(formData));
        setLoading(false);
        onClose();
    };

    return (
        // Backdrop
        <Box sx={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}>
            {/* Modal */}
            <Box sx={{
                background: "white",
                borderRadius: 3,
                width: 420,
                overflow: "hidden",
                boxShadow: 24
            }}>
                {/* Header */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3, py: 2,
                    borderBottom: "1px solid #eee"
                }}>
                    <Typography variant="h6" fontWeight="bold">
                        Edit Profile
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Body */}
                <Box sx={{ px: 3, py: 3 }}>

                    {/* Profile Pic Upload */}
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                        <Box sx={{ position: "relative" }}>
                            <Avatar
                                src={preview}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    fontSize: 36
                                }}
                            >
                                {user?.username?.[0]?.toUpperCase()}
                            </Avatar>

                            {/* Camera Icon */}
                            <IconButton
                                component="label"
                                sx={{
                                    position: "absolute",
                                    bottom: 0, right: 0,
                                    background: "#667eea",
                                    color: "white",
                                    width: 28, height: 28,
                                    "&:hover": { background: "#5a6fd6" }
                                }}
                            >
                                <PhotoCameraIcon sx={{ fontSize: 16 }} />
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImage}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Username */}
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Bio */}
                    <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        multiline
                        minRows={3}
                        placeholder="Apne baare mein likho..."
                        sx={{ mb: 3 }}
                    />

                    {/* Buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                borderColor: "#667eea",
                                color: "#667eea"
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%)"
                                }
                            }}
                        >
                            {loading
                                ? <CircularProgress size={22} color="inherit" />
                                : "Save Changes"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default EditProfile;