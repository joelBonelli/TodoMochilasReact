import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


// const imagenes = import.meta.glob("../assets/images/*.jpg", { eager: true });
// const obtenerImagen = (nombreArchivo) => {
//   return imagenes[`../assets/images/${nombreArchivo}`]?.default || imagenes[`../assets/images/default.jpg`]?.default;
// };

const Cart = () => {

  const carrito = JSON.parse(localStorage.getItem("cart")) || [];
  const { cart, removeFromCart } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

    
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

 // Función para verificar el stock de todos los productos en el carrito
 const verificarStock = async () => {
  if (carrito.length === 0) {
    setError("El carrito está vacío.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    console.log("Verificando y descontando stock para los productos:", carrito);

    for (const product of carrito) {
      const response = await fetch(`http://localhost:8888/productos/${product.id_mochila}/restar-stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ cantidad: product.cantidad }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error en la solicitud: ${response.status}`);
      }
    }

    finalizarCompra(); // Solo se ejecuta si todos los productos pudieron restar stock
  } catch (error) {
    console.error("Error al verificar y restar stock:", error);
    setError(`Hubo un problema al verificar el stock: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  const finalizarCompra = () => {
    // Prevenir la acción por defecto del botón si está dentro de un formulario
   // e.preventDefault();
    // Limpiar el carrito en localStorage
    localStorage.removeItem("cart");
    window.location.reload();
    alert("Compra completada. ¡Gracias por tu compra!");
  };

  return (
    <div>
      <Header />

      <main className="contenedor">
        <h1>Carrito de Compras</h1>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="contenedor">
            {carrito.map((product) => (
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