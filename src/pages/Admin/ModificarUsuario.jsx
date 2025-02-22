import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ModificarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDNI] = useState("");
  const [correo, setCorreo] = useState("");
 
  const [rol, setRol] = useState("");
  const [legajo, setLegajo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {


    fetch(`http://localhost:8888/usuarios/${id}`)
      .then((res) => res.json())
      .then((usuario) => {
        if (usuario) {
          const usuarioData = Array.isArray(usuario) ? usuario[0] : usuario;



          setNombre(usuarioData.nombre_usuario);
          setApellido(usuarioData.apellido_usuario);
          setDNI(usuarioData.dni_usuario);
          setCorreo(usuarioData.correo_usuario);
          setRol(usuarioData.nivel_usuario);
          setLegajo(usuarioData.legajo_usuario);


        } else {
          setProducto(null);
        }
      })
      .catch((error) => console.error("Error con el fetch", error));
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !dni || !correo.trim() ||  !rol || !legajo) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("dni", dni);
    formData.append("correo", correo);
    formData.append("rol", rol);
    formData.append("legajo", legajo);


    fetch(`http://localhost:8888/usuarios/actualizar/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Producto actualizado", data);
        navigate("/usuariosTabla");
      })
      .catch((error) => console.error("Error:", error));
  };


  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Modificar Usuario</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="formulario agregar-usuario" encType="multipart/form-data">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />

          <label htmlFor="dni">DNI</label>
          <input type="number" id="dni" value={dni} onChange={(e) => setDNI(e.target.value)} required />

          <label htmlFor="correo">Correo</label>
          <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

          <label htmlFor="legajo">Legajo</label>
          <input type="number" id="legajo" value={legajo} onChange={(e) => setLegajo(e.target.value)} required />

          <label htmlFor="rol">Rol</label>
          <input
            type="number"
            id="rol"
            value={rol}
            min={1}
            max={3}
            onChange={(e) => setRol(e.target.value)}
            required
          />

          <button type="submit" className="boton-amarillo">Modificar usuario</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ModificarUsuario;