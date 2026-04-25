// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";


export const searchUsers =  createAsyncThunk(
    "/users/search",
    async (query,{rejectWithValue}) =>{
        try {
            const res = await api.get(`/users/search/${query}`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
            
        }
    }
)
// User profile fetch karo
export const fetchUserProfile = createAsyncThunk(
    "users/fetchProfile",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/users/${userId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// User ki posts fetch karo
export const fetchUserPosts = createAsyncThunk(
    "users/fetchUserPosts",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/posts/user/${userId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Follow / Unfollow
export const followUser = createAsyncThunk(
    "users/follow",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.put(`/users/${userId}/follow`);
            return { userId, message: res.data.message };
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// update profile

export const updateProfile = createAsyncThunk(
    "users/updateProfile",
    async (formData, {rejectWithValue})=>{
        try {
            const res = await api.put("/users/update", formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);
 



const usersSlice = createSlice({
    name: "users",
    initialState: {
        profile: null,      // jis user ka profile dekh rahe ho
        userPosts: [], 
        searchResults: [],      // us user ki posts
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.profile = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch user posts
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.userPosts = action.payload;
            })

            // Follow / Unfollow
            .addCase(followUser.fulfilled, (state, action) => {
                if (!state.profile) return;
                const { message, userId } = action.payload;
            
                if (message === "Followed") {
                    // Object push karo — string nahi!
                    state.profile.followers.push({ _id: userId });
                } else {
                    state.profile.followers = state.profile.followers.filter(
                        f => f._id !== userId && f !== userId
                    );
                }
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload;  // profile update ho gaya
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.searchResults = action.payload;
            })
    }
});

export default usersSlice.reducer;