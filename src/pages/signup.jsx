import React, { useState } from "react";
import "../LoginForm.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Obtener la lista de usuarios del localStorage
        const users = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el correo electrónico ya existe en la lista
        const userExists = users.some((user) => user.correo === correo);
        if (userExists) {
            alert("El correo electrónico ya está registrado");
            return;
        }

        // Asignar el id automáticamente
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = {
            id: newId,
            nombre,
            correo,
            password,
            rol: 2, // Rol de cliente
        };

        // Agregar el nuevo usuario a la lista
        users.push(newUser);

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("usuarios", JSON.stringify(users));

        alert("Registrado con éxito");

        // Redirigir a la vista de login
        window.location.href = "/login";
    };

    return (
        <div>
            <Header />

            <div className="login-container">
                <div className="login-card">
                    <h2>Regístrate</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Registrarse
                        </button>
                    </form>
                    <p className="signup-link">
                        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
