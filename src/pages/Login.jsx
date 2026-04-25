// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert
} from "@mui/material";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector(state => state.auth);
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) newErrors.email = "Email required hai!";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Valid email enter karo!";
        if (!form.password) newErrors.password = "Password required hai!";
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        dispatch(loginUser(form));
    };

    return (
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}>
            <Paper elevation={8} sx={{
                padding: 4,
                width: 400,
                borderRadius: 3
            }}>
                {/* Logo/Title */}
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
                    👋 Welcome Back
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                    Login karo apne account mein
                </Typography>

                {/* Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Email */}
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 2 }}
                />

                {/* Password */}
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{ mb: 3 }}
                />

                {/* Submit */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%)"
                        }
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>

                {/* Register Link */}
                <Typography textAlign="center" mt={2} variant="body2">
                    Account nahi hai?{" "}
                    <Link to="/register" style={{ color: "#667eea", fontWeight: "bold" }}>
                        Register karo
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;