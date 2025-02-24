import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: "",
    foto: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, foto: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validaciones
    if (!formData.nombre || /\d/.test(formData.nombre)) {
      formErrors.nombre = "El nombre no puede estar vacío ni contener números.";
    }
    if (!formData.apellido || /\d/.test(formData.apellido)) {
      formErrors.apellido = "El apellido no puede estar vacío ni contener números.";
    }
    if (!formData.telefono || !/^\d{8,}$/.test(formData.telefono)) {
      formErrors.telefono = "El teléfono debe contener solo números y al menos 8 dígitos.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "El correo electrónico no es válido.";
    }
    if (!formData.mensaje) {
      formErrors.mensaje = "El mensaje no puede estar vacío.";
    }
    if (formData.foto && !/\.(jpg|jpeg|png)$/i.test(formData.foto.name)) {
      formErrors.foto = "El archivo debe ser una imagen .jpg, .jpeg o .png.";
    }

    setErrors(formErrors);

    // Si no hay errores, enviar el formulario
    if (Object.keys(formErrors).length === 0) {
      alert("Formulario enviado correctamente!"); // Mostrar mensaje de éxito

      setTimeout(() => {
        navigate("/"); // Redirigir a la página principal después del alert
      }, 2000);
    }
  };

  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Contacto</h2>

        <form onSubmit={handleSubmit} className="formulario">
          <fieldset>
            <legend>Información de contacto</legend>

            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ingrese su nombre" />
            {errors.nombre && <p className="error">{errors.nombre}</p>}

            <label htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Ingrese su apellido" />
            {errors.apellido && <p className="error">{errors.apellido}</p>}

            <label htmlFor="telefono">Teléfono</label>
            <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Número de contacto" />
            {errors.telefono && <p className="error">{errors.telefono}</p>}

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico de contacto" />
            {errors.email && <p className="error">{errors.email}</p>}

            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
            {errors.mensaje && <p className="error">{errors.mensaje}</p>}
          </fieldset>

          <fieldset className="sublimado">
            <legend>Sublimados</legend>

            <label htmlFor="mochila">Talle de mochila</label>
            <select name="mochila" id="mochila">
              <option value="S">Talle S</option>
              <option value="M">Talle M</option>
              <option value="L">Talle L</option>
              <option value="XL">Talle XL</option>
            </select>

            <label htmlFor="foto">Foto</label>
            <p>Cargue el archivo para sublimado</p>
            <input type="file" name="foto" id="foto" onChange={handleFileChange} />
            {errors.foto && <p className="error">{errors.foto}</p>}

            <p>En caso de que la imagen enviada no se pueda cargar</p>

            <div className="similitud">
              <label htmlFor="igual">Adaptarla</label>
              <input type="radio" name="similitud" value="adaptar" id="igual" />

              <label htmlFor="buscar">Buscar otra</label>
              <input type="radio" name="similitud" value="buscar" id="buscar" />
            </div>
          </fieldset>

          <input type="submit" className="boton-amarillo" value="ENVIAR" />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;