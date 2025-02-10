import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  
  



  return (
    <footer className="footer">
      <div className="contenedor">
        <nav className="navegacion">
          <Link to="/About">Nosotros</Link>
          <Link to="/Gallery">Galeria</Link>
          <Link to="/Contact">Contacto</Link>
        </nav>
      </div>

      <p>Todos los derechos reservados 2024</p>
    </footer>
  );
};

export default Footer;
