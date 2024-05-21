import { Navigate } from "react-router-dom";
import { useAuth } from "../custom-hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};