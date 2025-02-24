import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AgregarProducto = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  // Estado para manejar los campos del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!nombre || !precio || !descripcion || !imagen) {
      setError("Todos los campos son obligatorios desde el front.");
      return false;
    }
    if (isNaN(precio) || precio <= 0) {
      setError("El precio debe ser un número válido mayor a 0");
      return false;
    }
    return true;
  }


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Crear un nuevo producto
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);


    try {
      const response = await fetch(`http://localhost:8888/productos/create`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}` // Agrega el token al encabezado de autorización
        }
      })
      const result = await response.json();

      if (response.ok) {
        navigate("/productostabla");

      } else {
        setError(result.message || "Error al crear el producto");
      }
    } catch (error) {
      setError(`Error de conexion con el servidor: ${error.message}`);
      console.error("Error de conexion con el servidor:", error);

    }
  };



  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Agregar Nuevo Producto</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="formulario agregar-producto" encType="multipart/form-data">
          <label htmlFor="nombre">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />

          <label htmlFor="imagen">Seleccionar Imagen</label>
          <input
            type="file"
            id="imagen"
            onChange={(e) => setImagen(e.target.files[0])}
            required
          />


          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="boton-amarillo">Agregar Producto</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AgregarProducto;
