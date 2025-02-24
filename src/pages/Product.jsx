import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const Product = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [producto, setProducto] = useState(null);
  const { addToCart } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8888/productos/${id}`)
      .then(res => res.json())
      .then(producto => {
        console.log("datos recibidos", producto);

        if (Array.isArray(producto) && producto.length > 0) {
          setProducto(producto[0]);
        } else {
          setProducto(null);
        }
      })
      .catch(error => console.error('Error con el fetc', error));
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe y recargue la página
    
    if (!user) {
      alert("Debe iniciar sesión para continuar");
      return;
    }
    const quantity = parseInt(e.target.cantidad.value);

    if (!quantity || quantity <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    }
    console.log(producto.stock_mochila);
    if (quantity > producto.stock_mochila) {
      alert("Stock insuficiente");
      return;
    }

    // Crear un objeto de producto con los productos seleccionados
    const newProduct = {
      ...producto,
      cantidad: quantity,
    };
    addToCart(newProduct);
    alert(`${producto.nombre_mochila} ha sido añadido al carrito.`);
    navigate("/gallery");
  };

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <Header />

      <main className="contenedor" >
        <h1>{producto.nombre_mochila}</h1>
        <div className="descripcion">
          <img src={producto.foto_mochila} alt={producto.nombre_mochila} />

          <div className="mochila-descripcion">
            <p>{producto.descripcion_mochila}</p>

            <p>${producto.precio_mochila}</p>

            <form action="#" className="formulario" onSubmit={handleAddToCart}>

              <input
                type="number"
                id="cantidad"
                name="cantidad"
                placeholder="cantidad"
                min="1"
              />

              <input
                type="submit"
                className="boton-amarillo"
                value="Añadir al carro"
              />
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
