import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ModificarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuariosGuardados.find((u) => u.id === parseInt(id));

    if (usuario) {
      setCorreo(usuario.correo);
      setNombre(usuario.nombre);
      setPassword(usuario.password);
      setRol(usuario.rol);
    } else {
      navigate("/usuariostabla");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuariosGuardados.findIndex((usuario) => usuario.id === parseInt(id));

    if (index !== -1) {
      usuariosGuardados[index] = {
        id: parseInt(id),
        correo,
        nombre,
        password,
        rol: parseInt(rol),
      };

      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      navigate("/usuariostabla");
    }
  };

  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Modificar Usuario</h2>
        <form onSubmit={handleSubmit} className="formulario modificar-usuario">
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

          <button type="submit" className="boton-amarillo">Guardar Cambios</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ModificarUsuario;