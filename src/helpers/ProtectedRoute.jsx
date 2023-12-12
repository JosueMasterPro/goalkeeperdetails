import { Navigate } from "react-router-dom";
//import { useAuth } from "../context/authContext";
import { useState } from "react";

export function ProtectedRoute({ children }) {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState("null");
    //const { user, loading } = useAuth();

    //if (loading) return <h1>Loading</h1>;

    if (!user) return <Navigate to="/login" />;

    return <>{children}</>;
}