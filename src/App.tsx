import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotAuthenicatedCheck from "./core/middleware/NotAuthenticatedCheck";
import { LoginForm } from "./core/pages/auth/Login";
import SignupForm from "./core/pages/auth/Signup";
import AuthenicatedCheck from "./core/middleware/AuthenticatedCheck";
import Overview from "./core/pages/dashboard/Overview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotAuthenicatedCheck />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
          <Route path="/" element={<AuthenicatedCheck />}>
            <Route path="overview" element={<Overview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
