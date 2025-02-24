import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductosTable = () => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchProductos = () => {
        fetch("http://localhost:8888/productos", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(productos => {
                setProductos(productos);
            })
            .catch(error => console.error('Error con el fetc', error));
    }

    useEffect(() => {
        fetchProductos();
    }, []);


    // Función para eliminar un producto
    const eliminarProducto = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            fetch(`http://localhost:8888/productos/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Error al eliminar el producto");
                    }
                    alert("Producto eliminado con éxito");
                    fetchProductos();
                    //navigate("/productostabla");
                })
                .catch((error) => {
                    alert("No se pudo eliminar el producto");
                });
        }
    };


    // Función para redirigir a la vista de modificar
    const modificarProducto = (id) => {
        navigate(`/modificar-producto/${id}`);
    };

    return (
        <div>
            <Header />
            <main className="contenedor">
                <h2 className="subtitulo">Lista de Productos</h2>
                <table className="tabla container">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id_mochila}>
                                <td>{producto.id_mochila}</td>
                                <td>{producto.nombre_mochila}</td>
                                <td>${producto.precio_mochila}</td>
                                <td>
                                    <img
                                        // src={obtenerImagen(producto.foto_mochila)}
                                        src={producto.foto_mochila}
                                        alt={producto.nombre_mochila}
                                        className="producto-imagen"
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => modificarProducto(producto.id_mochila)}
                                        className="boton-am"
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        onClick={() => eliminarProducto(producto.id_mochila)}
                                        className="boton-rojo"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => navigate("/agregar-producto")}
                    className="boton-verde"
                >
                    Agregar Producto
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default ProductosTable;
