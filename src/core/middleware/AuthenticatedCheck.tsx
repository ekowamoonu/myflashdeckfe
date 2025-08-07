import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import apiClient from "@/lib/axios.ts";
import { useState, useEffect } from "react";
import LoadingScreen from "../shared-components/LoadingScreen";

const AuthenicatedCheck = () => {
  /**
   * Check if user is currently logged in
   * Return the outlet
   * If not, redirect to login route
   */

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await apiClient.get("/check-login");
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
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AuthenicatedCheck;
