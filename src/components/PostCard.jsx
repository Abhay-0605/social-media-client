// // src/components/PostCard.jsx
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, likePost,addComment, deleteComment } from "../features/posts/postsSlice";
// import { Link } from "react-router-dom";

// function PostCard({ post }) {
//     const dispatch = useDispatch();
//     const { user } = useSelector(state => state.auth);
//     const [commentText, setCommentText] = useState("");
//     const [showComments, setShowComments] = useState(false);

//     const isLiked = post.likes.some(id => id === user._id || id._id === user._id);
    
//      const isOwner = post.user._id === user._id || post.user === user._id;

//     const handleComment = () => {
//         if (!commentText.trim()) return;
//         dispatch(addComment({ postId: post._id, text: commentText }));
//         setCommentText("");
//     };

//     return (
//         <div style={{
//             border: "1px solid #ccc",
//             borderRadius: 8,
//             padding: 16,
//             marginBottom: 16
//         }}>
    
//             {/* User info */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               
//                 <Link to={`/profile/${post.user._id}`} style={{ textDecoration: "none", color: "black" }}>
                
//                     <strong>@{post.user.username}</strong>
//                 </Link>
//                 {isOwner && (
//                     <button
//                         onClick={() => dispatch(deletePost(post._id))}
//                         style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}
//                     >
//                         Delete
//                     </button>
//                 )}
//             </div>
           
//             {/* Post text */}
//             <p style={{ margin: "12px 0" }}>{post.text}</p>

//             {/* Post image */}
//             {post.image && (
//                 <img
//                     src={post.image}
//                     alt="post"
//                     style={{ width: "100%", borderRadius: 8, marginBottom: 8 }}
//                 />
//             )}

//             {/* Like + Comment buttons */}
//             <div style={{ display: "flex", gap: 16 }}>
//                 <button
//                     onClick={() => dispatch(likePost(post._id))}
//                     style={{
//                         border: "none",
//                         background: "none",
//                         cursor: "pointer",
//                         color: isLiked ? "red" : "gray",
//                         fontSize: 16
//                     }}
//                 >
//                     {isLiked ? "❤️" : "🤍"} {post.likes.length}
//                 </button>

//                 <button
//                     onClick={() => setShowComments(!showComments)}
//                     style={{ border: "none", background: "none", cursor: "pointer", fontSize: 16 }}
//                 >
//                     💬 {post.comments.length}
//                 </button>
//             </div>

//             {/* Comments section */}
//             {showComments && (
//                 <div style={{ marginTop: 12 }}>
//                     {/* Comments list */}
//                     {post.comments.map(comment => (
//                         <div
//                             key={comment._id}
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 padding: "6px 0",
//                                 borderBottom: "1px solid #eee"
//                             }}
//                         >
//                             <span>
//                                 <strong>@{comment.user.username}: </strong>
//                                 {comment.text}
//                             </span>
//                             {comment.user._id === user._id && (
//                                 <button
//                                     onClick={() => dispatch(deleteComment({
//                                         postId: post._id,
//                                         commentId: comment._id
//                                     }))}
//                                     style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}
//                                 >
//                                     ✕
//                                 </button>
//                             )}
//                         </div>
//                     ))}

//                     {/* Add comment */}
//                     <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                         <input
//                             placeholder="Comment likho..."
//                             value={commentText}
//                             onChange={(e) => setCommentText(e.target.value)}
//                             style={{ flex: 1, padding: 6 }}
//                         />
//                         <button onClick={handleComment}>Post</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default PostCard;

// src/components/PostCard.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, addComment, deleteComment } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";
import {
    Box,
    Paper,
    Avatar,
    Typography,
    IconButton,
    TextField,
    Button,
    Divider,
    Collapse
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

function PostCard({ post }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const isLiked = post.likes.some(id => id === user._id || id._id === user._id);
    const isOwner = post.user._id === user._id || post.user === user._id;

    const handleComment = () => {
        if (!commentText.trim()) return;
        dispatch(addComment({ postId: post._id, text: commentText }));
        setCommentText("");
    };

    return (
        <Paper elevation={2} sx={{ borderRadius: 3, mb: 2, overflow: "hidden" }}>
            {/* Header */}
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box
                    component={Link}
                    to={`/profile/${post.user._id}`}
                    sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", color: "inherit" }}
                >
                    <Avatar
                        src={post.user.profilePic}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            width: 40,
                            height: 40
                        }}
                    >
                        {post.user.username?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography fontWeight="bold" fontSize={14}>
                            @{post.user.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(post.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            })}
                        </Typography>
                    </Box>
                </Box>

                {/* Delete — sirf owner */}
                {isOwner && (
                    <IconButton
                        onClick={() => dispatch(deletePost(post._id))}
                        size="small"
                        sx={{ color: "error.light" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* Post Text */}
            <Box sx={{ px: 2, pb: 1.5 }}>
                <Typography>{post.text}</Typography>
            </Box>

            {/* Post Image */}
            {post.image && (
                <Box
                    component="img"
                    src={post.image}
                    alt="post"
                    sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
                />
            )}

            <Divider />

            {/* Actions */}
            <Box sx={{ px: 1, py: 0.5, display: "flex", gap: 1 }}>
                {/* Like */}
                <Button
                    startIcon={isLiked
                        ? <FavoriteIcon sx={{ color: "error.main" }} />
                        : <FavoriteBorderIcon />
                    }
                    onClick={() => dispatch(likePost(post._id))}
                    sx={{
                        color: isLiked ? "error.main" : "text.secondary",
                        textTransform: "none",
                        borderRadius: 5
                    }}
                >
                    {post.likes.length}
                </Button>

                {/* Comment Toggle */}
                <Button
                    startIcon={<ModeCommentOutlinedIcon />}
                    onClick={() => setShowComments(!showComments)}
                    sx={{ color: "text.secondary", textTransform: "none", borderRadius: 5 }}
                >
                    {post.comments.length}
                </Button>
            </Box>

            {/* Comments Section */}
            <Collapse in={showComments}>
                <Divider />
                <Box sx={{ px: 2, py: 1.5 }}>

                    {/* Comments List */}
                    {post.comments.map(comment => (
                        <Box
                            key={comment._id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                py: 1,
                                borderBottom: "1px solid #f0f0f0"
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Avatar
                                    src={comment.user.profilePic}
                                    sx={{ width: 28, height: 28, fontSize: 12 }}
                                >
                                    {comment.user.username?.[0]?.toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" fontWeight="bold">
                                        @{comment.user.username}
                                    </Typography>
                                    <Typography variant="body2">{comment.text}</Typography>
                                </Box>
                            </Box>

                            {/* Delete comment */}
                            {comment.user._id === user._id && (
                                <IconButton
                                    size="small"
                                    onClick={() => dispatch(deleteComment({
                                        postId: post._id,
                                        commentId: comment._id
                                    }))}
                                    sx={{ color: "error.light" }}
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    ))}

                    {/* Add Comment */}
                    <Box sx={{ display: "flex", gap: 1, mt: 1.5, alignItems: "center" }}>
                        <Avatar
                            src={user?.profilePic}
                            sx={{ width: 30, height: 30, fontSize: 12 }}
                        >
                            {user?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Comment likho..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleComment()}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleComment}
                            disabled={!commentText.trim()}
                            sx={{
                                borderRadius: 5,
                                textTransform: "none",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            }}
                        >
                            Post
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </Paper>
    );
}

export default PostCard;