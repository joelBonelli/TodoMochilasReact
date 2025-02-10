import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaShoppingCart } from "react-icons/fa"; // Importamos el ícono de React Icons
import productos from "../assets/js/productos";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const productosGuardados = localStorage.getItem("productos");

  if (!productosGuardados || JSON.parse(productosGuardados).length === 0) {
    // Convertir a JSON y guardar en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));
    console.log("Productos cargados en localStorage");
  }

  return (
    <header>
      <div className="contenedor">
        <Link to="/">
          <p>
            Todo<span className="span-header">Mochilas</span>
          </p>
        </Link>

        <nav className="navegacion">
          <Link to="/about">Nosotros</Link>
          <Link to="/gallery">Galeria</Link>
          <Link to="/contact">Contacto</Link>
        </nav>

        <div>
          {user ? (
            <div className="iconos-sesion-cart">
              <span className="username">{user.nombre_usuario} {user.apellido_usuario}</span>{" "}
              {/* Muestra el nombre del usuario */}
              <button
                onClick={logout}
                className="login-icon"
                title="Cerrar sesión"
              >
                <FaSignOutAlt size={40} />
              </button>
              <Link to="/cart" className="login-icon">
                <FaShoppingCart size={40} title="Carrito" />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="login-icon">
              <FaUserCircle size={40} title="Iniciar sesión" />
              <span className="login-text">Iniciar sesión</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
