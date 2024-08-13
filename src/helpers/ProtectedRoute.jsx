import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import LoadingPage from "../components/LoadingPage";
//import { useState } from "react";

export function ProtectedRoute({ children }) {
    // eslint-disable-next-line no-unused-vars
    //const [user, setUser] = useState("null");
    const { user, loading } = useAuth();

    if (loading) return <LoadingPage/>;

    if (!user) return <Navigate to="/login" />;

    return <>{children}</>;
}