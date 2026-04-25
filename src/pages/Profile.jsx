// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, fetchUserPosts, followUser } from "../features/users/usersSlice";
import PostCard from "../components/PostCard";
import EditProfile from "../components/EditProfile";
import {
    Box,
    Container,
    Paper,
    Avatar,
    Typography,
    Button,
    Divider,
    CircularProgress,
    Grid
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function Profile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, userPosts, loading, error } = useSelector(state => state.users);
    const { user } = useSelector(state => state.auth);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        dispatch(fetchUserProfile(id));
        dispatch(fetchUserPosts(id));
    }, [id]);

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress />
        </Box>
    );

    if (error) return (
        <Typography color="error" textAlign="center" mt={4}>❌ {error}</Typography>
    );

    if (!profile) return null;

    const isFollowing = profile.followers.some(
        f => f._id === user._id || f._id?.toString() === user._id?.toString()
    );
    const isOwnProfile = profile._id === user._id;

    return (
        <Box sx={{ minHeight: "100vh", background: "#f0f2f5", py: 3 }}>
            <Container maxWidth="sm">

                {/* Back Button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2, textTransform: "none", color: "text.secondary" }}
                >
                    Back
                </Button>

                {/* Profile Card */}
                <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden", mb: 2 }}>

                    {/* Cover */}
                    <Box sx={{
                        height: 120,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    }} />

                    {/* Profile Info */}
                    <Box sx={{ px: 3, pb: 3 }}>

                        {/* Avatar */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            mt: -5,
                            mb: 2
                        }}>
                            <Avatar
                                src={profile.profilePic}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    border: "4px solid white",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    fontSize: 36
                                }}
                            >
                                {profile.username?.[0]?.toUpperCase()}
                            </Avatar>

                            {/* Follow / Edit Button */}
                            {isOwnProfile ? (
                                <Button
                                    variant="outlined"
                                    startIcon={<EditIcon />}
                                    onClick={() => setShowEdit(true)}
                                    sx={{
                                        borderRadius: 5,
                                        textTransform: "none",
                                        borderColor: "#667eea",
                                        color: "#667eea"
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button
                                    variant={isFollowing ? "outlined" : "contained"}
                                    startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
                                    onClick={() => dispatch(followUser(profile._id))}
                                    sx={{
                                        borderRadius: 5,
                                        textTransform: "none",
                                        background: isFollowing ? "transparent" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        borderColor: "#667eea",
                                        color: isFollowing ? "#667eea" : "white",
                                        "&:hover": {
                                            background: isFollowing ? "transparent" : "linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%)"
                                        }
                                    }}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </Button>
                            )}
                        </Box>

                        {/* Name + Bio */}
                        <Typography variant="h6" fontWeight="bold">
                            @{profile.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            {profile.bio || "No bio yet"}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        {/* Stats */}
                        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {userPosts.length}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Posts
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {profile.followers.length}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Followers
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {profile.following.length}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Following
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>

                {/* User Posts */}
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    {isOwnProfile ? "Your Posts" : `${profile.username}'s Posts`}
                </Typography>

                {userPosts.length === 0 ? (
                    <Typography textAlign="center" color="text.secondary" mt={2}>
                        Koi post nahi abhi tak! 📭
                    </Typography>
                ) : (
                    userPosts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </Container>

            {/* Edit Modal */}
            {showEdit && <EditProfile onClose={() => setShowEdit(false)} />}
        </Box>
    );
}

export default Profile;