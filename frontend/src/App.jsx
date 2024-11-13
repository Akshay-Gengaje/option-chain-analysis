import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginButton from "./components/Login/LogginButton";
import RedirectHandler from "./components/Login/RedirectHandler";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginButton />} />
        <Route path="/auth/callback" element={<RedirectHandler />} />

        {/* Protected Route for authenticated users only */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

        {/* Redirect all other paths to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
