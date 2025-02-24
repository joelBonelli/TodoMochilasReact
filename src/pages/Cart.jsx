import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {

  const carrito = JSON.parse(localStorage.getItem("cart")) || [];
  const { cart, removeFromCart } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  console.log(carrito);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);


  const agruparProductos = (productos) => {
    const productosAgrupados = productos.reduce((acc, producto) => {
      const existente = acc.find((p) => p.id_mochila === producto.id_mochila);
      if (existente) {
        existente.cantidad += producto.cantidad;
      } else {
        acc.push({ ...producto });
      }
      return acc;
    }, []);
    return productosAgrupados;
  }

  const productosAgrupados = agruparProductos(carrito);

  console.log(carrito);

  //Función para verificar el stock de todos los productos en el carrito
  const verificarStock = async () => {
    const productosComprados = [];
    productosAgrupados.forEach(element => {
      if (element.cantidad > element.stock_mochila) {
        alert("Stock insuficiente, vuelva a elejir una cantidad");
        return;
      }
      productosComprados.push({ id: element.id_mochila, cantidad: element.cantidad });
    });
    finalizarCompra(productosComprados);
  };


  const finalizarCompra = async (productos) => {
    try {
      // Ejecutar todas las llamdas en paralelo
      const responses = await Promise.all(productos.map((producto) =>
        fetch(`http://localhost:8888/productos/${producto.id}/restar-stock`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cantidad: producto.cantidad }),
        })
      ));

      // Verificar si alguna peticion fallo
      const errors = responses.filter(response => !response.ok);
      if (errors.length > 0) {
        setError("Problemas con el stock");
        return;
      }

      // Si las peticiones son exitosas
      console.log("compra hecha");
      // Limpiar el carrito en localStorage
      localStorage.removeItem("cart");
      alert("Compra completada. ¡Gracias por tu compra!");
      window.location.reload();
    } catch (error) {
      console.error("Error de conexion con el servidor", error);
    }
  };


  return (
    <div>
      <Header />

      <main className="contenedor">
        <h1>Carrito de Compras</h1>

        {/* {carrito.length === 0 ? ( */}
        {productosAgrupados.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="contenedor">
            {/* {carrito.map((product) => ( */}
            {productosAgrupados.map((product) => (
              <div key={product.id_mochila} className="producto-carrito">
                <img
                  src={product.foto_mochila}
                  alt={product.nombre_mochila}
                  style={{
                    width: "400px",
                    height: "auto",
                    marginRight: "10px",
                  }}
                />
                <span>{product.nombre_mochila}</span>
                <span>${product.precio_mochila}</span>
                <span>Talle: {product.talle}</span>
                <span>Cantidad: {product.cantidad}</span>
                <button
                  className="boton-rojo"
                  onClick={() => removeFromCart(product.id_mochila)}
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="centrado">
              <button
                className="boton-verde"
                onClick={verificarStock}
                disabled={loading}
              >
                {loading ? "Verificando..." : "Completar compra"}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;











// const removeFromCart = (productId) => {
//   //console.log(productId);
//   // Filtrar el carrito para eliminar el producto por ID
//   const updatedCart = carrito.filter((product) => product.id_mochila !== productId);
//   // Actualizar el carrito en localStorage
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   window.location.reload();
// }