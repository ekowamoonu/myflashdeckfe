import { Outlet } from "react-router-dom";

const NotAuthenicatedCheck = () => {
  /**
   * Check if user is currently logged in
   * If user is logged in, redirect to dashboard
   * Else display not authenticated route
   */

  return <Outlet />;
};

export default NotAuthenicatedCheck;
