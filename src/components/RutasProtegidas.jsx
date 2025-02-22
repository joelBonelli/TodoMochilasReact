import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Si no está autenticado o no es administrador, redirigimos al login
  if (!user || !token || user.nivel_usuario !== 3) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si está autenticado y es administrador, muestra el componente
  return element;
};

export default ProtectedRoute;