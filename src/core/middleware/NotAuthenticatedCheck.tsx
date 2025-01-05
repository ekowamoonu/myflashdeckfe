import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../shared-components/LoadingScreen";

const NotAuthenicatedCheck = () => {
  /**
   * Check if user is currently logged in
   * If user is logged in, redirect to dashboard
   * Else display not authenticated route
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("/check-login");
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Outlet />;

  return <Navigate to="/overview" />;
};

export default NotAuthenicatedCheck;
