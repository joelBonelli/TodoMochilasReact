import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const ModificarProducto = () => {
  const token = localStorage.getItem("token");
  console.log("token extraido en agregar productos", localStorage.getItem("token"));

  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  // Estado para manejar los campos del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenPreview, setImagenPreview] = useState("");
  

  useEffect(() => {
    fetch(`http://localhost:8888/productos/${id}`)
    .then( res => res.json() )
    .then( producto => {
      if (producto) {
        const productoData = Array.isArray(producto) ? producto[0] : producto;
        setProducto(productoData);
        setNombre(productoData.nombre_mochila);
        setPrecio(productoData.precio_mochila);
        setImagenPreview(productoData.foto_mochila);
        setDescripcion(productoData.descripcion_mochila);
        console.log("useEFFEc", imagen);
        console.log("useEFFEc", nombre);
        console.log("use effec image previa", imagenPreview);
      } else {
        setProducto(null);
      }
    })
    .catch(error => console.error('Error con el fetc', error));
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
      console.log("HANDLE-IMAGE-CHANGE",file);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre del producto no puede estar vacío.");
      return;
    }

    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
      alert("Ingrese un precio válido mayor a 0.");
      return;
    }

    if (!descripcion.trim()) {
      alert("La descripción no puede estar vacía.");
      return;
    }
    
    const formData = new FormData();
    formData.append("nombre", nombre || producto.nombre_mochila);
    formData.append("precio", precio || producto.precio_mochila);
    formData.append("descripcion", descripcion || producto.descripcion_mochila);
    
    // Verificar si se seleccionó una nueva imagen
    if (imagen instanceof File) {
      formData.append("imagen", imagen);
    } else {
      // Extraer solo el nombre del archivo de la URL
      const nombreArchivo = producto.foto_mochila.split("/").pop();
      formData.append("imagenActual", nombreArchivo);
    }

    console.log([...formData.entries()]); // Para verificar qué datos está enviando
    console.log("Nombre:", nombre);
    console.log("Precio:", precio);
    console.log("Imagen:", imagen);
    console.log("Descripción:", descripcion);


    fetch(`http://localhost:8888/productos/actualizar/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}` // Agrega el token al encabezado de autorización
    }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Producto actualizado", data);
      navigate("/productostabla");
    })
    .catch((error) => console.error("Error al actualizar", error));
  };

  

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
            type="file"
            id="imagen"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagenPreview && (
            <div>
              <p>Imagen Actual</p>
              <img src={imagenPreview} alt="Vista previa" style={{ width: "100px", height: "100px", marginBottom: "20px" }} />
            </div>
          )}

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

