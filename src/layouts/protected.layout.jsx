import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedLayout = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner message="Authenticating..." />;
  }

  if (!isSignedIn) {
    return <Navigate to="/officeit-admin/login" />;
  }

  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
