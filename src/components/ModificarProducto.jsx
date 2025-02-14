import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const ModificarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  // Estado para manejar los campos del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Cargar los datos del producto al montar el componente
  // useEffect(() => {
  //   // Obtener productos desde el localStorage
  //   const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  //   // Buscar el producto que corresponde al ID
  //   const producto = productosGuardados.find((p) => p.id === parseInt(id));

  //   if (producto) {
  //     // Pre-llenar el formulario con los datos del producto
  //     setNombre(producto.nombre);
  //     setPrecio(producto.precio);
  //     setImagen(producto.imagen);
  //     setDescripcion(producto.descripcion);
  //   } else {
  //     // Si no se encuentra el producto, redirigir al listado
  //     navigate("/productostabla");
  //   }
  // }, [id, navigate]);

  useEffect(() => {
    fetch(`http://localhost:8888/productos/${id}`)
    .then( res => res.json() )
    .then( producto => {
      if (producto) {
        const productoData = Array.isArray(producto) ? producto[0] : producto;
        setProducto(productoData);
        setNombre(productoData.nombre_mochila);
        setPrecio(productoData.precio_mochila);
        setImagen(productoData.foto_mochila);
        setDescripcion(productoData.descripcion_mochila);
      } else {
        setProducto(null);
      }
    })
    .catch(error => console.error('Error con el fetc', error));
  }, [id])



  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nombre:", nombre);
    console.log("Precio:", precio);
    console.log("Imagen:", imagen);
    console.log("Descripción:", descripcion);

    const data = {
      nombre,
      precio,
      imagen,
      descripcion,
    };

    fetch(`http://localhost:8888/productos/actualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Producto actualizado", data);
      navigate("/productostabla");
    })
    .catch((error) => console.error("Error al actualizar", error));
  };

  //   // Obtiene los productos existentes del LocalStorage
  //   const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  //   // encuentra el índice del producto a modificar
  //   const index = productosGuardados.findIndex((producto) => producto.id === parseInt(id));

  //   if (index !== -1) {
  //     // Actualiza los datos del producto
  //     productosGuardados[index] = {
  //       id: parseInt(id), // El ID no se cambia
  //       nombre,
  //       precio,
  //       imagen,
  //       descripcion,
  //     };

  //     // Guarda los productos actualizados en el LocalStorage
  //     localStorage.setItem("productos", JSON.stringify(productosGuardados));

  //     // Redirigie al listado de productos
  //     navigate("/productostabla");
  //   }

  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Modificar Producto</h2>
        <form onSubmit={handleSubmit} className="formulario agregar-producto">
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
            type="text"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)} // Para manejar la imagen seleccionada
            
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="boton-amarillo">Guardar Cambios</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ModificarProducto;
