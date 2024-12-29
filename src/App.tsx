import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotAuthenicatedCheck from "./core/middleware/NotAuthenticatedCheck";
import { LoginForm } from "./core/pages/auth/Login";
import SignupForm from "./core/pages/auth/Signup";
import AuthenicatedCheck from "./core/middleware/AuthenticatedCheck";
import Overview from "./core/pages/dashboard/overview/Index";
import VehicleProfiles from "./core/pages/dashboard/vehicle_profiles/Index";
import Expenses from "./core/pages/dashboard/expenses/Index";
import Maintenance from "./core/pages/dashboard/maintenance/Index";
import FuelTracking from "./core/pages/dashboard/fuel-tracking/Index";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route element={<NotAuthenicatedCheck />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
          <Route element={<AuthenicatedCheck />}>
            <Route index path="overview" element={<Overview />} />
            <Route path="vehicle-profiles" element={<VehicleProfiles />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="fuel-tracking" element={<FuelTracking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
