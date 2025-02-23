import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// Cargar todas las imágenes de la carpeta "assets/images"
// const imagenes = import.meta.glob("../assets/images/*.jpg", { eager: true });
// const obtenerImagen = (nombreArchivo) => {
//   return imagenes[`../assets/images/${nombreArchivo}`]?.default || imagenes[`../assets/images/default.jpg`]?.default;
// };

const Gallery = () => {
  //estado para almacenar los productos
  const [productos, setProductos] = useState([]);

  //cargar los datos del localstorage
  // useEffect(() => {
  //   const productosGuardados = localStorage.getItem("productos");
  //   if (productosGuardados) {
  //     setProductos(JSON.parse(productosGuardados));
  //   }
  // }, []);

  useEffect(() => {
        fetch("http://localhost:8888/productos")
        .then( res => res.json())
        .then( productos => {
          //console.log(productos);
          setProductos(productos);
        })
        .catch(error => console.error('Error con el fetch', error));
    }, [])



  return (
    <div>
      <Header />

      <main className="contenido">
        <h1>Nuestros Productos</h1>

        <div className="galeria">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div className="producto" key={producto.id_mochila}>
                {/* <img src={obtenerImagen(producto.foto_mochila)} alt={producto.nombre_mochila} /> */}
                <img src={producto.foto_mochila} alt={producto.nombre_mochila} />
                <div className="info-producto">
                  <p className="producto-nombre">{producto.nombre_mochila}</p>
                  <p className="producto-precio">${producto.precio_mochila}</p>

                  <Link to={`/product/${producto.id_mochila}`} className="boton-amarillo">
                    Ver Producto
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
