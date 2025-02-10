import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AgregarUsuarioAdmin = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const nuevoUsuario = {
      id: usuariosGuardados.length ? usuariosGuardados[usuariosGuardados.length - 1].id + 1 : 1,
      correo,
      nombre,
      password,
      rol: parseInt(rol),
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    alert("Usuario agregado exitosamente");
    navigate("/usuariostabla");
  };

  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Agregar Usuario</h2>
        <form onSubmit={handleSubmit} className="formulario agregar-usuario">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="rol">Rol</label>
          <input
            type="number"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          />

          <button type="submit" className="boton-amarillo">Agregar Usuario</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AgregarUsuarioAdmin;