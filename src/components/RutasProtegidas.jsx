import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  
  // Si no está autenticado o no es administrador, redirigimos al login
  if (!user || user.nivel_usuario !== 3) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado y es administrador, muestra el componente
  return element;
};

export default ProtectedRoute;