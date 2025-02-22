import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Cargar todas las imágenes de la carpeta "assets/images"
const imagenes = import.meta.glob("../assets/images/*.jpg", { eager: true });
const obtenerImagen = (nombreArchivo) => {
  return imagenes[`../assets/images/${nombreArchivo}`]?.default || imagenes[`../assets/images/default.jpg`]?.default;
};

const MasVendidos = () => {
  const [productosMasCaros, setProductosMasCaros] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8888/productos")
      .then( res => res.json())
      .then( productos => {
        // Ordena los productos por el precio ascendente
        const productosOrdenados = productos
        .sort((a, b) => b.precio_mochila - a.precio_mochila)
        .slice(0,3);
        setProductosMasCaros(productosOrdenados);
      })
      .catch(error => console.error('Error con el fetc', error));
  }, [])



  return (
    <section className="contenedor">
      <h2 className="subtitulo">Modelos más vendidos</h2>

      <div className="contenedor-anuncios">
        {productosMasCaros.length > 0 ? (
          productosMasCaros.map((producto) => (
            <div className="anuncio" key={producto.id_mochila}>
              <img
                className="anuncio-foto"
                // src={obtenerImagen(producto.foto_mochila)}
                src={producto.foto_mochila}
                alt={producto.nombre_mochila}
              />
              <div className="contenido-anuncio">
                <h3>{producto.nombre_mochila}</h3>
                <p>{producto.descripcion_mochila}</p>
                <p className="precio">${producto.precio_mochila}</p>
                <Link to={`/Product/${producto.id_mochila}`} className="boton-amarillo">
                  Ver Producto
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      <div className="centrado">
        <Link to="/Gallery" className="boton-verde">
          Ver Todas
        </Link>
      </div>
    </section>
  );
};

export default MasVendidos;
