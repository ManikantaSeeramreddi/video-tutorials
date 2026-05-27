import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function AdminProtectedRoute({ children, redirectTo = "/admin-login" }) {
  const { isAdminAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <div className="mt-3 text-muted">Checking session…</div>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}

