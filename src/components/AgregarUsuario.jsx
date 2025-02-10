import React, { useState } from "react";

const AgregarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(2); // Rol por defecto como cliente (2)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el nuevo usuario
    const nuevoUsuario = {
      id: new Date().getTime(), // ID único basado en la fecha
      nombre,
      correo,
      password,
      rol,
    };

    // Obtener los usuarios existentes del LocalStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Agregar el nuevo usuario
    usuariosGuardados.push(nuevoUsuario);

    // Guardar los usuarios actualizados en el LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    // Limpiar los campos del formulario
    setNombre("");
    setCorreo("");
    setPassword("");
    setRol(2); // Restaurar rol a cliente por defecto
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario agregar-usuario">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
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
        <select
          id="rol"
          value={rol}
          onChange={(e) => setRol(Number(e.target.value))}
        >
          <option value={1}>Administrador</option>
          <option value={2}>Cliente</option>
        </select>

        <button type="submit" className="boton-amarillo">
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default AgregarUsuario;
