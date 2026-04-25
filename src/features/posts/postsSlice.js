
 // src/features/posts/postsSlice.js
 import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import api from "../../api/axios";
// Sare posts fetch karo
export const fetchPosts = createAsyncThunk(
    "posts/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/posts");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Post banao
export const createPost = createAsyncThunk(
    "posts/create",
    async (postData, { rejectWithValue }) => {
        try {
            const res = await api.post("/posts", postData);
            console.log(res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Post delete karo
export const deletePost = createAsyncThunk(
    "posts/delete",
    async (postId, { rejectWithValue }) => {
        try {
            await api.delete(`/posts/${postId}`);
            return postId;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Like / Unlike


export const likePost = createAsyncThunk(
    "posts/like",
    async (postId,{rejectWithValue})=>{
        try {
            const res = await api.put(`/posts/${postId}/like`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
)

// Comment add
export const addComment = createAsyncThunk(
    "posts/addComment",
    async ({ postId, text }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/posts/${postId}/comment`, { text });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Comment delete
export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async ({ postId, commentId }, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/posts/${postId}/comment/${commentId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create post
            .addCase(createPost.fulfilled, (state, action) => {

                state.posts.unshift(action.payload);  // upar add karo
            })

            // Delete post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(p => p._id !== action.payload);
            })

            // Like post — updated post replace karo
            .addCase(likePost.fulfilled, (state, action) => {
                const index  = state.posts.findIndex( p => p._id===action.payload._id);
                if(index!=-1) state.posts[index] = action.payload;
            })

            // Comment add — updated post replace karo
            .addCase(addComment.fulfilled, (state, action) => {
                const index = state.posts.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.posts[index] = action.payload;
            })

            // Comment delete — updated post replace karo
            .addCase(deleteComment.fulfilled, (state, action) => {
                const index = state.posts.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.posts[index] = action.payload;
            })
    }
});

export default postsSlice.reducer;