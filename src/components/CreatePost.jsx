// src/components/CreatePost.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postsSlice";
import {
    Box,
    Paper,
    Avatar,
    TextField,
    Button,
    Divider,
    CircularProgress
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

function CreatePost() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setLoading(true);
        await dispatch(createPost({ text }));
        setText("");
        setLoading(false);
    };

    return (
        <Paper elevation={2} sx={{ borderRadius: 3, mb: 2, overflow: "hidden" }}>
            <Box sx={{ p: 2, display: "flex", gap: 2, alignItems: "flex-start" }}>
                {/* Avatar */}
                <Avatar
                    src={user?.profilePic}
                    sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        width: 44,
                        height: 44
                    }}
                >
                    {user?.username?.[0]?.toUpperCase()}
                </Avatar>

                {/* Input */}
                <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    placeholder={`Kya soch rahe ho, ${user?.username}?`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    sx={{ fontSize: 16 }}
                />
            </Box>

            <Divider />

            {/* Footer */}
            <Box sx={{
                px: 2, py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Button
                    startIcon={<ImageIcon />}
                    sx={{ color: "text.secondary", textTransform: "none" }}
                >
                    Photo
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!text.trim() || loading}
                    sx={{
                        borderRadius: 5,
                        px: 3,
                        textTransform: "none",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%)"
                        }
                    }}
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Post"}
                </Button>
            </Box>
        </Paper>
    );
}

export default CreatePost;