import React, { useState } from "react";
import "../LoginForm.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDNI] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    //Por default el rol sera 1 (cliente)
    const [rol, setRol] = useState(1);
    const [legajo, setLegajo] = useState("");
    const [error, setError] = useState("");


    const validateForm = () => {
        if (!correo || !nombre || !apellido || !dni || !password ) {
            setError("Todos los campos son obligatorios");
            return false;
        }

        if (password !== password2) {
            setError("Las contraseñas no coinciden");
            return false;
        }

        //El rol debe ser 1 para hacelro cliente
        const rolNumero = Number(rol);
        if (isNaN(rolNumero) || rolNumero < 1 || rolNumero > 3) {
            setError("El rol debe ser un número entre 1 y 3");
            return false;
        }
        return true;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('correo', correo);
        formData.append('dni', dni);
        formData.append('password', password);
        formData.append('legajo', 999999);
        formData.append('rol', 1);

        try {
            console.log(Array.from(formData.entries()));

            const response = await fetch(`http://localhost:8888/usuarios/register`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json();
                setError(result.message || "Error al crear el usuario");
                return;
            }

            console.log("Usuario creado", formData);
            navigate("/usuariostabla");

        } catch (error) {
            setError(`Error de conexión con el servidor: ${error.message}`);
            console.error("Error de conexión con el servidor:", error);
        }

        // Redirigir a la vista de login
        window.location.href = "/login";
    };

    return (
        <div>
            <Header />

            <main className="contenedor">
                <h2 className="subtitulo">Agregar Usuario</h2>
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

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor="password2">Repetir contraseña</label>
                    <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} required />

                    <button type="submit" className="boton-amarillo">Agregar Usuario</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Signup;
