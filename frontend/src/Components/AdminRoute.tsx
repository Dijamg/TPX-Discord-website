import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

// Lets only admin users access the component this component wraps
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isAdmin } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;