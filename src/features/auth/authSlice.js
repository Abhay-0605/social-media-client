// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { updateProfile } from "../users/usersSlice";
// Register
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        // console.log(userData)
        try {
           
            const res = await api.post("/auth/register", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        await api.post("/auth/logout");
    }
);

// Session check — app load hone pe
export const checkSession = createAsyncThunk(
    "auth/checkSession",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/me");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        sessionChecked: false  // app load pe check hua ya nahi
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })

            // Session check
            .addCase(checkSession.fulfilled, (state, action) => {
                state.user = action.payload;
                // console.log("======user2" , state.user);
                state.sessionChecked = true;
            })
            .addCase(checkSession.rejected, (state,action) => {
                console.log(action.error,"n");
                state.user = null;
                state.sessionChecked = true;

            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;  // navbar mein bhi update ho ✅
            })
    }
});

export default authSlice.reducer;