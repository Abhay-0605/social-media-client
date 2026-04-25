// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { user } = useSelector(state => state.auth);
    // console.log("======user" , user)
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;