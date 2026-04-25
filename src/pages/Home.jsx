// src/pages/Home.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { Box, CircularProgress, Typography, Container } from "@mui/material";

function Home() {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <Box sx={{
            minHeight: "100vh",
            background: "#f0f2f5",
            py: 3
        }}>
            <Container maxWidth="sm">
                <CreatePost />

                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error" textAlign="center" mt={2}>
                        ❌ {error}
                    </Typography>
                )}

                {!loading && posts.length === 0 && (
                    <Typography textAlign="center" color="text.secondary" mt={4}>
                        Koi post nahi abhi tak — pehli post karo! 🚀
                    </Typography>
                )}

                {posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </Container>
        </Box>
    );
}

export default Home;
