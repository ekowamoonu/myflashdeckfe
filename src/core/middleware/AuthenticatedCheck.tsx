import { Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const AuthenicatedCheck = () => {
  /**
   * Check if user is currently logged in
   * Return the outlet
   * If not, redirect to login route
   */

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AuthenicatedCheck;
