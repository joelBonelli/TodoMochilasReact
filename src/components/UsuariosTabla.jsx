import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const UsuariosTabla = () => {
  const navigate = useNavigate();
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
        navigate("/usuariostabla");
    }
  };

  const modificarUsuario = (id) => {
    navigate(`/modificar-usuario/${id}`);
  };

  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Lista de Usuarios</h2>
        <button onClick={() => navigate('/agregar-usuario')} className="boton-verde">Agregar Usuario</button>
        <table className="tabla container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button onClick={() => modificarUsuario(usuario.id)} className="boton-am">Modificar</button>
                  <button onClick={() => eliminarUsuario(usuario.id)} className="boton-rojo">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default UsuariosTabla;
