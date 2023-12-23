import useAuth from "src/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Navigate to="/todos" replace /> : <Outlet />;
};

export default PublicRoute;
