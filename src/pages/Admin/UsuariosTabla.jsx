import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const UsuariosTabla = () => {
  const [usuarios, setUsuarios] = React.useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUsuarios = () => {
    fetch("http://localhost:8888/usuarios")
      .then((res) => res.json())
      .then((usuarios) => {
        setUsuarios(usuarios);
      })
      .catch((error) => console.error("Error con el fetch", error));
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

 //Falta la función para eliminar un usuario

 const eliminarUsuario = (id) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    fetch(`http://localhost:8888/usuarios/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}` // Agrega el token al encabezado de autorización
    }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el usuario");
        }
        alert("Usuario eliminado con éxito");
        fetchUsuarios();
      })
      .catch((error) => {
        alert("No se pudo eliminar el usuario");
      });
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
              <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre_usuario}</td>
              <td>{usuario.correo_usuario}</td>
              <td>{usuario.nivel_usuario}</td>
              <td>
                  <button onClick={() => modificarUsuario(usuario.id_usuario)} className="boton-am">Modificar</button>
                  <button onClick={() => eliminarUsuario(usuario.id_usuario)} className="boton-rojo">Eliminar</button>
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
