import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotAuthenicatedCheck from "./core/middleware/NotAuthenticatedCheck";
import { LoginForm } from "./core/pages/auth/Login";
import SignupForm from "./core/pages/auth/Signup";
import AuthenicatedCheck from "./core/middleware/AuthenticatedCheck";
import Overview from "./core/pages/dashboard/overview/Index";
import VehicleProfiles from "./core/pages/dashboard/vehicle_profiles/Index";
import CreateNewVehicleProfile from "./core/pages/dashboard/vehicle_profiles/create/Index";
import EditVehicleProfile from "./core/pages/dashboard/vehicle_profiles/edit/Index";
import Expenses from "./core/pages/dashboard/expenses/Index";
import Maintenance from "./core/pages/dashboard/maintenance/Index";
import CreateNewMaintenanceRecord from "./core/pages/dashboard/maintenance/create/Index";
import EditMaintenanceRecord from "./core/pages/dashboard/maintenance/edit/Index";
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
            {/* vehicle profiles */}
            <Route path="vehicle-profiles">
              <Route index element={<VehicleProfiles />} />
              <Route path="create" element={<CreateNewVehicleProfile />} />
              <Route path="details/:id" element={<EditVehicleProfile />} />
            </Route>

            {/* expenses */}
            <Route path="expenses" element={<Expenses />} />

            {/* maintenance */}
            <Route path="maintenance">
              <Route index element={<Maintenance />} />
              <Route path="create" element={<CreateNewMaintenanceRecord />} />
              <Route path="details/:id" element={<EditMaintenanceRecord />} />
            </Route>

            {/* fuel tracking */}
            <Route path="fuel-tracking" element={<FuelTracking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
